import React from "react";
import styles from "./loader.module.css";

const BackDropLoader = () => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.loading}></div>
    </div>
  );
};
export default BackDropLoader;
