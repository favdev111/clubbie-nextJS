import React from "react";
import cn from "classnames";
import styles from "./button.module.css";

const Button = (props) => {
  const { variant, children, onClick, type, loading } = props;
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={cn(
          styles.btn,
          loading && styles.btnDisabled,
          variant === "danger" && styles.danger,
          variant === "cancel" && styles.cancel
        )}
        disabled={loading}
      >
        <div className={styles.btnContent}>
          {loading && <div className={styles.loading}></div>}
          <span className={styles.contTxt}>{children}</span>
        </div>
      </button>
    </>
  );
};
export default Button;
