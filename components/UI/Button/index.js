import React from "react";
import styles from "./button.module.css";

const Button = (props) => {
  const { variant = "login", children, clickHandler } = props;
  return (
    <>
      <button onClick={clickHandler} className={styles.btn}>
        <span className={styles.contTxt}>{children}</span>
      </button>
    </>
  );
};
export default Button;
