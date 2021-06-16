import React from "react";
import styles from "./cell.module.css";
import cn from "classnames";

function PaymentCell({ children, span }) {
  return (
    <>
      <div
        className={cn(
          styles.cell,
          span == 2 && styles.cellSpan2,
          span == 3 && styles.cellSpan3
        )}
      >
        {children}
      </div>
    </>
  );
}

export default PaymentCell;
