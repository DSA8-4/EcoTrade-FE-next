'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import { firebaseConfig } from '@/utils/config';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './ecoProductEdit.module.css';

const EcoProductEdit = ({ params }) => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const router = useRouter();
  const { id } = params;

  const [formData, setFormData] = useState({
    title: '',
    ecoPoints: '',
    content: '',
    ecoProductImages: [],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8090/EcoProduct/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('상품 정보를 불러오는 데 실패했습니다.');
        }
        const data = await response.json();
        setFormData({
          title: data.title || '',
          ecoPoints: data.price || '',
          content: data.content || '',
          ecoProductImages: data.imageUrls || [], // 기존 이미지
        });
        console.log('ecoProduct: ', data);
      } catch (error) {
        console.error('Error fetching product:', error);
        alert(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8090/EcoProduct/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('상품 수정에 실패했습니다.');
      }

      alert('상품이 성공적으로 수정되었습니다.');
      router.push(`/ecoProduct`);
    } catch (error) {
      console.error('Failed to update product:', error);
      alert(error.message);
    }
  };

  const changeImage = async (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = await uploadImages(files); // 이미지 업로드 및 URL 가져오기
    setFormData({
      ...formData,
      ecoProductImages: imageUrls, // 기존 이미지를 삭제하고 새로운 이미지만 설정
    });
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
      <h1 className={styles.h1}>상품 수정</h1>
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
            value={formData.title}
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
            value={formData.ecoPoints}
            required
          />
        </div>
        <div className={styles.inlined}>
          <label
            className={styles.label}
            htmlFor="contents">
            설명
          </label>
          <textarea
            className={styles.contents}
            name="content"
            value={formData.content}
            required
            onChange={handleChange}
          />
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
            {formData.ecoProductImages.map((src, index) => (
              <Image
                key={index}
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
          type="submit">
          수정하기
        </button>
      </form>
    </div>
  );
};

export default EcoProductEdit;
