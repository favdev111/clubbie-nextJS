import React from "react";
import styles from "./index.module.css";

function FormSubmit({ children }) {
  return <div className={styles.formSubmit}>{children}</div>;
}

export default FormSubmit;
