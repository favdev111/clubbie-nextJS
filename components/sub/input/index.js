import React, { useState } from "react";
import styles from "./input.module.css";

const TemplateInput = ({ type, placeholder, name, value, required, onChange }) => {
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
          <img src="/assets/eye.svg" alt="show password" />
        </a>
      ) : null}
    </div>
  );
};
export default TemplateInput;
