'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import { firebaseConfig } from '@/utils/config';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './productEdit.module.css';

const categories = [
  { value: 'ELECTRONICS', label: '전자제품' },
  { value: 'FASHION', label: '패션' },
  { value: 'HOME', label: '가정용품' },
  { value: 'BEAUTY', label: '뷰티' },
  { value: 'SPORTS', label: '스포츠' },
  { value: 'TOYS', label: '장난감' },
  { value: 'AUTOMOTIVE', label: '자동차용품' },
  { value: 'BOOKS', label: '도서' },
  { value: 'MUSIC', label: '음악' },
  { value: 'OTHERS', label: '기타' },
];

const ProductEdit = ({ params }) => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const router = useRouter();
  const { id } = params;

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    contents: '',
    category: 'ELECTRONICS',
    productImages: [],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8090/products/detail/${id}`, {
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
          price: data.price || '',
          contents: data.contents || '',
          category: data.category || '',
          productImages: data.productImages || [], // 기존 이미지
        });
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
      const response = await fetch(`http://localhost:8090/products/update/${id}`, {
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
      router.push('/product'); // 수정 완료 후 목록으로 이동
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
      productImages: imageUrls, // 기존 이미지를 삭제하고 새로운 이미지만 설정
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
            htmlFor="price">
            가격
          </label>
          <input
            onChange={handleChange}
            type="number"
            className={styles.input}
            name="price"
            value={formData.price}
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
            name="contents"
            value={formData.contents}
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.inlined}>
          <label
            htmlFor="category"
            className={styles.label}>
            카테고리
          </label>
          <select
            name="category"
            onChange={handleChange}
            value={formData.category}
            className={styles.select}>
            {categories.map((category) => (
              <option
                key={category.value}
                value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
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
            name="images"
            multiple
            accept="image/*"
            onChange={changeImage}
          />
        </div>
        {formData.productImages.length === 0 ? (
          <Icon size={'160px'}>image_search</Icon>
        ) : (
          <div className={styles.imagePreview}>
            {formData.productImages.map((src, index) => (
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

export default ProductEdit;
