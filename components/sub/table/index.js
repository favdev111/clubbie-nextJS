import React from "react";
import cn from "classnames";
import TableRow from "./row";
import styles from "./table.module.css";

/**
 * Sample Input
 * A value can be a function or a string, a custom component can be passed as a function
 * const header = [() => <p>Header</p>, "Header", () => <p>ActionButtons</p>];
 * const rows = [[() => <p>Row1</p>, "Row1", () => <p>ActionButtons</p>]];
 */
function Table({ className, header, rows }) {
  return (
    <div className={cn(styles.table, className)}>
      <TableRow header={header} />
      <div className={styles.tableRows}>
        {rows?.map((row, index) => (
          <TableRow key={row + index} index={index} row={row} />
        ))}
      </div>
    </div>
  );
}

export default Table;
