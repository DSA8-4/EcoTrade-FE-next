"use client";
import { useEffect, useState } from "react";
import style from "./products.module.css";
const Product = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8090/products/list")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  return (
    <>
      <h1 className={style.h1}>Product List</h1>
      <div className={style.productList}></div>
    </>
  );
};
export default Product;
