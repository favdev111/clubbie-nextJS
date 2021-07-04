import React from "react";
import styles from "./index.module.css";
import cn from "classnames";
function MessageToUser({ message, err }) {
  return (
    <div className={cn(styles.messageUser, err ? styles.err : styles.success)}>
      <div className={styles.inner}> {message}</div>
    </div>
  );
}

export default MessageToUser;
