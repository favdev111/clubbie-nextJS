import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";
import Switch from "@sub/switch";
import styles from "./index.module.css";

const SwitchInput = ({
  type,
  name,
  placeholder,
  inActiveText,
  inputPrefix,
  customProps,
  onActive,
  onInActive,
  hint,
  inputClassName,
}) => {
  const inputRef = useRef(null);

  const [_switchActive, setSwitchActive] = useState(false);
  const [_placeholder, setPlaceholder] = useState(null);

  useEffect(() => {
    setPlaceholder(inActiveText || "");
  }, []);

  const onSwitchCheck = () => {
    setSwitchActive(true);
    setPlaceholder(placeholder || "");
    onActive && onActive();
  };

  const onSwitchUnCheck = () => {
    setSwitchActive(false);
    setPlaceholder(inActiveText || "");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onInActive && onInActive();
  };

  return (
    <>
      <div
        className={cn(
          styles.switchInput,
          _switchActive &&
            hint?.type === "error" &&
            hint?.inputBorder &&
            styles.errorInput,
          _switchActive &&
            hint?.type === "info" &&
            hint?.inputBorder &&
            styles.infoInput,
          _switchActive &&
            hint?.type === "success" &&
            hint?.inputBorder &&
            styles.successInput
        )}
        id="switchInput"
        onClick={(e) => {
          if (e.target.id === "switchInput") {
            inputRef?.current?.focus();
          }
        }}
      >
        <Switch onCheck={onSwitchCheck} onUnCheck={onSwitchUnCheck} />
        {!_switchActive && inActiveText && (
          <span className={styles.inActiveText}>{inActiveText}</span>
        )}
        {_switchActive && inputPrefix && (
          <span className={styles.inputPrefix}>{inputPrefix}</span>
        )}
        {_switchActive && (
          <input
            type={type}
            name={name}
            ref={inputRef}
            className={cn(styles.input, inputClassName)}
            placeholder={_placeholder}
            {...customProps}
          />
        )}
      </div>
      {_switchActive && hint?.type && hint?.msg && (
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
};
export default SwitchInput;
