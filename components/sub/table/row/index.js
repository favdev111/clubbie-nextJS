import React from "react";
import styles from "./index.module.css";
import cn from "classnames";

function TableRow({ header, row, index }) {
  return (
    <div
      className={cn(
        styles.row,
        header && styles.header,
        index % 2 === 0 ? styles.darkerBg : styles.brightBg
      )}
    >
      {header &&
        header?.map((x) => (
          <div className={styles.cell}>{typeof x === "function" ? x() : x}</div>
        ))}
      {row &&
        row?.map((x) => (
          <div className={styles.cell}>{typeof x === "function" ? x() : x}</div>
        ))}
    </div>
  );
}

export default TableRow;
