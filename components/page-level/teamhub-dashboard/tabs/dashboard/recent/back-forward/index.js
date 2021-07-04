import React, { useEffect } from "react";
import ThickRight from "@svg/thick-right-arrow";
import ThickLeft from "@svg/thick-left-arrow";
import styles from "./index.module.css";

function BackForward({ length, setIndex, index }) {
  return (
    <div className={styles.backForward}>
      <div
        onClick={() => {
          setIndex(index > 0 ? index - 1 : 0);
        }}
        className={styles.left}
      >
        <ThickLeft />
      </div>
      <div
        onClick={() => {
          setIndex(index == Math.ceil(length / 2 - 1) ? index : index + 1);
        }}
        className={styles.right}
      >
        <ThickRight />
      </div>
    </div>
  );
}

export default BackForward;
