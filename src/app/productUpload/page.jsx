"use client";
import { useState } from "react";
import styles from "./productUpload.module.css";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseConfig } from "@/utils/config";

// let fileItems = [];

const ProductUpload = () => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    contents: "",
    productImages: [],
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrls = await uploadImages();

      setFormData({ ...formData, productImages: imageUrls });
      console.log("All files uploaded. URLs:", imageUrls);

      const response = await fetch("http://localhost:8090/products/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Product successfully registered:", data);
      alert("Product successfully registered.");
    } catch (error) {
      console.error("Failed to register product:", error);
      alert("Failed to register product. Please try again.");
    }
  };

  const changeImage = (e) => {
    // fileItems = Array.from(e.target.files);
    setImages(Array.from(e.target.files));
  };

  const uploadImages = () => {
    const uploadPromises = images.map((fileItem) => {
      const storageRef = ref(storage, "images/" + fileItem.name);
      const uploadTask = uploadBytesResumable(storageRef, fileItem);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.error("Upload failed:", error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log("File available at", url);
              resolve(url);
            });
          }
        );
      });
    });

    return Promise.all(uploadPromises);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>상품 등록</h1>
      <form onSubmit={handleSubmit} className={styles.productForm}>
        <label className={styles.label} htmlFor="title">
          상품명
        </label>
        <input
          onChange={handleChange}
          type="text"
          className={styles.input}
          name="title"
          required
        />

        <label className={styles.label} htmlFor="price">
          가격
        </label>
        <input
          onChange={handleChange}
          type="number"
          className={styles.input}
          name="price"
          required
        />

        <label className={styles.label} htmlFor="contents">
          상품 설명
        </label>
        <textarea
          className={styles.contents}
          name="contents"
          required
          onChange={handleChange}
        ></textarea>

        <label className={styles.label} htmlFor="files">
          상품 이미지
        </label>
        <input
          type="file"
          className={styles.input}
          name="images"
          multiple
          accept="image/*"
          onChange={changeImage}
        />

        <div className={styles.imagePreview}>
          {
            // formData.images.map((a) =)
          }
        </div>

        <button className={styles.button} type="submit">
          등록하기
        </button>
      </form>
    </div>
  );
};
export default ProductUpload;
