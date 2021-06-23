import React from "react";
import styles from "./button.module.css";

const Button = (props) => {
  const { variant = "login", children, onClick, type } = props;
  return (
    <>
      <button type={type} onClick={onClick} className={styles.btn}>
        <span className={styles.contTxt}>{children}</span>
      </button>
    </>
  );
};
export default Button;
