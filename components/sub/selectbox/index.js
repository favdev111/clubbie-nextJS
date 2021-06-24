import React from "react";
import styles from "./index.module.css";

function TemplateSelectBox({ name, id, options, selected, onChange }) {
  return (
    <>
      <select
        className={styles.selectBox}
        name={name}
        id={id}
        onChange={onChange}
      >
        {options.map((option) => (
          <option
            className={styles.option}
            value={option}
            selected={option === selected}
          >
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

export default TemplateSelectBox;
