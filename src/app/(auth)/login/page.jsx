"use client";
import Link from "next/link";
import styles from "../auth.module.css";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Make a POST request to your Spring Boot backend
      const response = await fetch("http://localhost:8090/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResponseMessage(data.message || "Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMessage("There was an error submitting the form.");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="username"
            placeholder="아이디"
            required
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            로그인
          </button>
        </form>
        <div className={styles.registerLink}>
          <span>아이디가 없으십니까?</span>
          <Link href="/register">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
