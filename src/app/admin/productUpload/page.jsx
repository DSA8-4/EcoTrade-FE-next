'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import { firebaseConfig } from '@/utils/config';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './productUpload.module.css';

const ProductUpload = () => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    ecoPoints: '',
    content: '',
    ecoProductImages: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8090/EcoProduct/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData), // FormData로 변환
      });

      if (!response.ok) {
        const errorResponse = await response.json(); // 오류 응답을 JSON으로 변환
        console.error('Error response:', errorResponse);
        throw new Error('Network response was not ok: ' + errorResponse.message);
      } else {
        alert('에코포인트 상품이 성공적으로 등록되었습니다.');
        router.push('/ecoProduct');
      }
    } catch (error) {
      console.error('상품 등록에 실패했습니다:', error);
      alert('상품 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const changeImage = async (e) => {
    setUploading(true);
    const result = await uploadImages(Array.from(e.target.files));
    setFormData({
      ...formData,
      ecoProductImages: result,
    });
    setUploading(false);
  };

  const uploadImages = (images) => {
    const uploadPromises = images.map((fileItem) => {
      const storageRef = ref(storage, 'images/' + fileItem.name);
      const uploadTask = uploadBytesResumable(storageRef, fileItem);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          () => {},
          (error) => {
            console.error('Upload failed:', error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log('File available at', url);
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
      <h1 className={styles.h1}>상품 등록(관리자 전용)</h1>
      <form
        onSubmit={handleSubmit}
        className={styles.productForm}>
        <div className={styles.inlined}>
          <label
            className={styles.label}
            htmlFor="title">
            상품명
          </label>
          <input
            onChange={handleChange}
            type="text"
            className={styles.input}
            name="title"
            required
          />
        </div>
        <div className={styles.inlined}>
          <label
            className={styles.label}
            htmlFor="ecoPoints">
            에코포인트
          </label>
          <input
            onChange={handleChange}
            type="number"
            className={styles.input}
            name="ecoPoints"
            required
          />
        </div>
        <div className={styles.inlined}>
          <label
            className={styles.label}
            htmlFor="content">
            설명
          </label>
          <textarea
            className={styles.contents}
            name="content"
            required
            onChange={handleChange}></textarea>
        </div>
        <div className={styles.inlined}>
          <label
            className={styles.label}
            htmlFor="files">
            상품 이미지
          </label>
          <input
            type="file"
            className={styles.input}
            name="ecoProductImages"
            multiple
            accept="image/*"
            onChange={changeImage}
          />
        </div>
        {formData.ecoProductImages.length === 0 ? (
          <Icon size={'160px'}>image_search</Icon>
        ) : (
          <div className={styles.imagePreview}>
            {formData.ecoProductImages.map((src) => (
              <Image
                key={src}
                src={src}
                alt="preview"
                width={160}
                height={160}
              />
            ))}
          </div>
        )}

        <button
          className={styles.button}
          type="submit"
          disabled={uploading}>
          {!uploading ? '등록하기' : '이미지 업로딩...'}
        </button>
      </form>
    </div>
  );
};

export default ProductUpload;
