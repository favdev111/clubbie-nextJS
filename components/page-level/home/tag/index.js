import React from "react";
import styles from "./index.module.css";

function Tag({ children }) {
  return <div className={styles.tag}>{children}</div>;
}

export default Tag;
