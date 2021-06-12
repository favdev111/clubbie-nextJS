import React from "react";
import styles from "./head.module.css";
import cn from "classnames";

function Head({ select }) {
  return (
    <>
      <div className={styles.cell}>Date</div>
      <div className={cn(select ? styles.cellSpan2 : styles.cellSpan3)}>
        Event
      </div>
      <div className={styles.cell}>Amount</div>
      {select && <div className={styles.cell}>Select</div>}
    </>
  );
}

export default Head;
