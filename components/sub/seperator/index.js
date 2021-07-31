import React from "react";
import cn from "classnames";
import styles from "./index.module.css";

function Seperator({ className }) {
  return (
    <div className={styles.seperatorWrapper}>
      <div className={cn(styles.seperator, className)}></div>
    </div>
  );
}

export default Seperator;
