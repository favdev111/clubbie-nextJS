import React from "react";
import RightArrow from "@svg/right-arrow";
import LeftArrow from "@svg/left-arrow";
import styles from "./index.module.css";

function BackForward() {
  return (
    <div className={styles.backForward}>
      <div className={styles.left}>
        <LeftArrow />
      </div>
      <div className={styles.right}>
        <RightArrow />
      </div>
    </div>
  );
}

export default BackForward;
