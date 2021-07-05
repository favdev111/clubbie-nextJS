import React from "react";
import styles from "./index.module.css";

function FormCell({ children }) {
  return <div className={styles.cell}> {children} </div>;
}

export default FormCell;
