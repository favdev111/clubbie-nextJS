import React from "react";
import ThreeDots from "@svg/threedots";
import styles from "./index.module.css";

function DetailCover() {
  return (
    <div className={styles.detailCover}>
      <img src="../../assets/detailcover.png" />
      <div className={styles.more}>
        <ThreeDots />
      </div>
      <div className={styles.price}>£4.00</div>
    </div>
  );
}

export default DetailCover;
