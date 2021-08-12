import React from "react";
import styles from "./index.module.css";

function RecentVideoCard({ videoSrc }) {
  return (
    <div>
      <video className={styles.video} controls>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}

export default RecentVideoCard;
