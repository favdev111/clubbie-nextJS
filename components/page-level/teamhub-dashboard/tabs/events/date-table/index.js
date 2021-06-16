import React, { useEffect } from "react";
import cn from "classnames";
import styles from "./index.module.css";

function DateTable({ selected, setSelected }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    document.getElementById("table").scrollLeft = selected * 80;
  });

  return (
    <div id="table" className={styles.table}>
      {months.map((month, index) => (
        <div
          onClick={(e) => setSelected(index)}
          className={cn(styles.month, selected == index && styles.selected)}
        >
          {month}
        </div>
      ))}
    </div>
  );
}

export default DateTable;
