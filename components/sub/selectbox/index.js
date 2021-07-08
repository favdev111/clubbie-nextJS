import React from "react";
import cn from "classnames";
import styles from "./index.module.css";

function TemplateSelectBox({
  name,
  id,
  options,
  selected,
  onChange,
  placeholder,
  customProps,
  hint,
}) {
  return (
    <>
      <select
        className={cn(
          styles.selectBox,
          hint?.type === "error" && hint?.inputBorder && styles.errorInput,
          hint?.type === "info" && hint?.inputBorder && styles.infoInput,
          hint?.type === "success" && hint?.inputBorder && styles.successInput
        )}
        name={name}
        id={id}
        onChange={onChange}
        {...customProps}
      >
        <option value="" className={styles.option}>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            className={styles.option}
            value={option}
            selected={option === selected}
          >
            {option}
          </option>
        ))}
      </select>
      {hint?.type && hint?.msg && (
        <p
          className={cn(
            hint?.type === "error" && styles.errorMsg,
            hint?.type === "info" && styles.infoMsg,
            hint?.type === "success" && styles.successMsg
          )}
        >
          {hint?.msg}
        </p>
      )}
    </>
  );
}

export default TemplateSelectBox;
