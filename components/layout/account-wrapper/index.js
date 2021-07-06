import React from "react";
import styles from "./wrap.module.css";

const Wrap = ({ children }) => {
  return (
    <div className={styles.wrapblock}>
      <div className={styles.wrapper}>
        <div className={styles.staticBlock}>
          <div className={styles.logoBlock}>
            <img className={styles.logo} src="/assets/logo.png" alt="logo" />
            <p className={styles.logoText}>Raising the bar for amateur sport</p>
          </div>
        </div>
        <div className={styles.dynamicBlock}>{children}</div>
      </div>
    </div>
  );
};
export default Wrap;
