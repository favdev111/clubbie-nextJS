import React, { useState } from "react";
import cn from "classnames";
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
  resizable,
  onEnter,
  customProps,
  hint,
  className,
  inputClassName,
  disabled,
  focused,
  size,
  postFixLabel,
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
    <div
      className={cn(
        styles.inputCont,
        !multiLine && styles.inputContFixHeight,
        className
      )}
    >
      {!multiLine ? (
        <>
          <span className={cn(styles.inputBox)}>
            <input
              className={cn(
                styles.inputBlock,
                !multiLine && styles.inputBlockFixHeight,
                disabled && styles.disabledInput,
                hint?.type === "error" &&
                  hint?.inputBorder &&
                  styles.errorInput,
                hint?.type === "info" && hint?.inputBorder && styles.infoInput,
                hint?.type === "success" &&
                  hint?.inputBorder &&
                  styles.successInput,
                size === "large" && styles.largeText,
                inputClassName
              )}
              disabled={disabled}
              type={typeInput}
              placeholder={placeholder}
              name={name}
              value={value}
              required={required}
              onChange={onChange}
              onKeyDown={(e) => onEnter && e.key === "Enter" && onEnter()}
              ref={(input) => input && focused && input.focus()}
              {...customProps}
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
            {type !== "password" && postFixLabel && (
              <span className={styles.postFixLabel}>{postFixLabel}</span>
            )}
          </span>
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
      ) : (
        <>
          <textarea
            className={cn(
              styles.inputBlock,
              styles.textArea,
              disabled && styles.disabledInput,
              resizable && styles.resizableTextArea,
              hint?.type === "error" && hint?.inputBorder && styles.errorInput,
              hint?.type === "info" && hint?.inputBorder && styles.infoInput,
              hint?.type === "success" &&
                hint?.inputBorder &&
                styles.successInput,
              size === "large" && styles.largeText,
              inputClassName
            )}
            disabled={disabled}
            placeholder={placeholder}
            name={name}
            value={value}
            required={required}
            onChange={onChange}
            rows={rows || 2}
            ref={(input) => input && focused && input.focus()}
            {...customProps}
          ></textarea>
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
      )}
    </div>
  );
};
export default TemplateInput;
