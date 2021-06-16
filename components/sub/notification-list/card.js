import React from "react";
import styles from "./card.module.css";

function NotificationCard({ data }) {
  const { src, title, desc, hour } = data;
  return (
    <div className={styles.card}>
      <div className={styles.leftSide}>
        <img src={src} />
        <div className={styles.inner}>
          <p className={styles.title}>{title}</p>
          <p className="opacity-50">{desc}</p>
        </div>
      </div>
      <div className={styles.rightSide}>
        <p>{hour}</p>
      </div>
    </div>
  );
}

export default NotificationCard;
