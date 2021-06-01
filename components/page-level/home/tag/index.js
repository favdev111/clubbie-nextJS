import React from "react";
import styles from "./index.module.css";
import cn from "classnames";

function Tag({ children, activeTag, index, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(styles.tag, activeTag == index && styles.active)}
    >
      {children}
    </div>
  );
}

export default Tag;
