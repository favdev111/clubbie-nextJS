import React from "react";
import ThickRight from "@svg/thick-right-arrow";
import ThickLeft from "@svg/thick-left-arrow";
import styles from "./index.module.css";

function BackForward({ length, setIndex, index }) {
  return (
    <div className={styles.backForward}>
      <div className={styles.left}>
        <ThickLeft />
      </div>
      <div className={styles.right}>
        <ThickRight />
      </div>
    </div>
  );
}

export default BackForward;
