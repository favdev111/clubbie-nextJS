import React from "react";
import ThickRight from "@svg/thick-right-arrow";
import ThickLeft from "@svg/thick-left-arrow";
import styles from "./index.module.css";
import cn from "classnames";

function BackForward({ length, setIndex, index }) {
  return (
    <div className={styles.backForward}>
      <div
        onClick={() => {
          setIndex(index > 0 ? index - 1 : 0);
        }}
        className={cn(styles.left, index == 0 && styles.disabled)}
      >
        <ThickLeft />
      </div>
      <div
        onClick={() => {
          setIndex(index == Math.ceil(length / 2 - 1) ? index : index + 1);
        }}
        className={cn(
          styles.right,
          index == Math.ceil(length / 2 - 1) && styles.disabled
        )}
      >
        <ThickRight />
      </div>
    </div>
  );
}

export default BackForward;
