"use client";
import { useEffect, useState } from "react";
import styles from "./productUpload.module.css";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseConfig } from "@/utils/config";
import { useRouter } from "next/navigation";

const ProductUpload = () => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    contents: "",
    productImages: [],
    member_id:
      typeof window !== "undefined" ? sessionStorage.getItem("member_id") : "",
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      router.replace("login");
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
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

  const changeImage = async (e) => {
    setUploading(true);
    const result = await uploadImages(Array.from(e.target.files));
    setFormData({
      ...formData,
      productImages: result,
    });
    setUploading(false);
  };

  const uploadImages = (images) => {
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
          },
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

        <div className={styles.imagePreview}>{}</div>

        <button className={styles.button} type="submit" disabled={uploading}>
          {!uploading ? "등록하기" : "이미지 업로딩..."}
        </button>
      </form>
    </div>
  );
};
export default ProductUpload;
