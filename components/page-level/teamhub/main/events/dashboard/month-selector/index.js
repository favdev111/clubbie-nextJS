import React, { useEffect } from "react";
import cn from "classnames";
import months from "@utils/fixedValues/months";
import styles from "./index.module.css";

function MonthSelector({ selectedMonthIndex, setSelectedMonthIndex }) {
  useEffect(() => {
    document.getElementById("table").scrollLeft = selectedMonthIndex * 80;
  });

  return (
    <div id="table" className={styles.table}>
      {months.map((month, index) => (
        <div
          key={month + index + Math.random()}
          onClick={(e) => setSelectedMonthIndex(index)}
          className={cn(
            styles.month,
            selectedMonthIndex == index && styles.selected
          )}
        >
          {month}
        </div>
      ))}
    </div>
  );
}

export default MonthSelector;
