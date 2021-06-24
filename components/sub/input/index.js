import React, { useState } from "react";
import styles from "./input.module.css";
import Eye from "@svg/eye";

const TemplateInput = ({
  type,
  placeholder,
  name,
  value,
  required,
  onChange,
  multiLine,
  rows,
}) => {
  const [typeInput, setTypeInput] = useState(type);
  const showPasswordHandler = (e) => {
    e.preventDefault();
    if (typeInput === "password") {
      setTypeInput("text");
    } else {
      setTypeInput("password");
    }
  };

  return (
    <div className={styles.inputCont}>
      {!multiLine ? (
        <>
          <input
            className={styles.inputBlock}
            type={typeInput}
            placeholder={placeholder}
            name={name}
            value={value}
            required={required}
            onChange={onChange}
          />
          {type === "password" ? (
            <a
              href="#"
              onClick={showPasswordHandler}
              className={styles.showPassword}
            >
              <Eye />
            </a>
          ) : null}
        </>
      ) : (
        <textarea
          className={styles.inputBlock}
          placeholder={placeholder}
          name={name}
          value={value}
          required={required}
          onChange={onChange}
          rows={rows || 2}
        ></textarea>
      )}
    </div>
  );
};
export default TemplateInput;
