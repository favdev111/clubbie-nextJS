import React from "react";
import styles from "./row.module.css";
import cn from "classnames";

function TableRow({ children, tableItem }) {
  return (
    <div className={cn(styles.table, tableItem && styles.tableItem)}>
      {children}
    </div>
  );
}

export default TableRow;
