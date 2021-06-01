import React from "react";
import styles from "./index.module.css";

function HomeVideosCard({ data }) {
  const { desc } = data;
  return (
    <div className={styles.videoCard}>
      <img src="" />

      <div className={styles.cardInner}>
        <div className={styles.cardInnerHeader}>
          <div className={styles.cardInnerInfo}>
            <p> Hernes</p>
            <p> .. ago</p>
          </div>
          <img src="" />
        </div>
        <div className={styles.cardUpload}>+</div>
      </div>
      <p> {desc}</p>
      <p> 255 views</p>
      {/* buttons */}
    </div>
  );
}

export default HomeVideosCard;
