import style from "./products.module.css";
const page = () => {
  return (
    <>
      <h1 className={style.h1}>Product List</h1>
      <div className={style.productList}></div>
    </>
  );
};
export default page;
