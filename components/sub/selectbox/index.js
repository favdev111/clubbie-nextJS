import React from "react";
import styles from "./index.module.css";

function TemplateSelectBox({ options }) {
  return (
    <>
      <select className={styles.selectBox} name="cars" id="cars">
        {options.map((option) => (
          <option className={styles.option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

export default TemplateSelectBox;
