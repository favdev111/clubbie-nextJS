import React from "react";
import styles from "./index.module.css";

function TemplateSelectBox({
  name,
  id,
  options,
  selected,
  onChange,
  placeholder,
}) {
  return (
    <>
      <select
        className={styles.selectBox}
        name={name}
        id={id}
        onChange={onChange}
      >
        <option value="" className={styles.option}>
          {placeholder}
        </option>
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
