import React from "react";
import styles from "./row.module.css";
function NotificationRow({ children }) {
  return <div className={styles.row}>{children}</div>;
}

export default NotificationRow;
