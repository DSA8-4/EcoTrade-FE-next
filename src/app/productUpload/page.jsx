import styles from "./productUpload.module.css";

const page = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>상품 등록</h1>
      <form className={styles.productForm}>
        <label className={styles.label} htmlFor="title">
          상품명
        </label>
        <input type="text" className={styles.input} name="title" required />

        <label className={styles.label} htmlFor="price">
          가격
        </label>
        <input type="number" className={styles.input} name="price" required />

        <label className={styles.label} htmlFor="contents">
          상품 설명
        </label>
        <textarea
          className={styles.contents}
          name="contents"
          required></textarea>

        <label className={styles.label} htmlFor="files">
          상품 이미지
        </label>
        <input
          type="file"
          className={styles.input}
          name="files"
          multiple
          accept="image/*"
        />

        <div className={styles.imagePreview}></div>

        <button className={styles.button} type="submit">
          등록하기
        </button>
      </form>
    </div>
  );
};
export default page;
