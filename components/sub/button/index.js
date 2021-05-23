import React from "react";
import styles from "./button.module.css";

const Button = (props) => {
  const { variant = "login", children } = props;
  return (
    <>
      <button className={styles.btn}>
        <span className={styles.contTxt}>{children}</span>
      </button>
    </>
  );
};
export default Button;
