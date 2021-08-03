import React, { useState } from "react";
import cn from "classnames";
import styles from "./index.module.css";

function Switch({
  className,
  name,
  checked,
  onCheck,
  onUnCheck,
  checkText,
  unCheckText,
  customProps,
}) {
  const [_checked, setChecked] = useState(checked);

  const onSwitchChange = async (e) => {
    const checkStatus = e?.target?.checked;
    setChecked(checkStatus);
    if (checkStatus && onCheck) await onCheck();
    else if (!checkStatus && onUnCheck) await onUnCheck();
  };

  return (
    <div className={styles.switchInput}>
      <div>
        <input
          id="switch"
          name={name}
          className={cn(styles.switch, className)}
          type="checkbox"
          defaultChecked={_checked}
          onChange={onSwitchChange}
          {...customProps}
        />
        <label for="switch"></label>
      </div>
      {checkText && _checked && (
        <span className={styles.checkStatus}>{checkText}</span>
      )}
      {unCheckText && !_checked && (
        <span className={styles.checkStatus}>{unCheckText}</span>
      )}
    </div>
  );
}

export default Switch;