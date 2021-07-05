import React from "react";
import styles from "./index.module.css";

function EventFormGrid({ children }) {
  return <div className={styles.formGrid}>{children}</div>;
}

export default EventFormGrid;
