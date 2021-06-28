import React from "react";
import ThreeDots from "@svg/threedots";
import styles from "./index.module.css";

function DetailCover({ img }) {
  return (
    <div className={styles.detailCover}>
      <div className={styles.cover}>
        <img src={img} />
      </div>
      <div className={styles.more}>
        <ThreeDots />
      </div>
      <div className={styles.price}>£4.00</div>
    </div>
  );
}

export default DetailCover;
