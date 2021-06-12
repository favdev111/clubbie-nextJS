import React from "react";
import styles from "./index.module.css";
import cn from "classnames";

function PaymentOverview() {
  const payments = {
    income: [
      { date: "11/12/20", cost: 4.5 },
      { date: "11/12/20", cost: 4.5 },
      { date: "11/12/20", cost: 4.5 },
      { date: "11/12/20", cost: 4.5 },
      { date: "11/12/20", cost: 4.5 },
      { date: "11/12/20", cost: 4.5 },
    ],
    outcome: [
      { date: "11/12/20", cost: 4.5 },
      { date: "11/12/20", cost: 4.5 },
      { date: "11/12/20", cost: 4.5 },
      { date: "11/12/20", cost: 4.5 },
      { date: "11/12/20", cost: 4.5 },
      { date: "11/12/20", cost: 4.5 },
    ],
  };

  return (
    <div className={styles.content}>
      <h3> Payments Overview</h3>
      <div className={styles.inner}>
        {/* Income */}
        <div className={styles.card}>
          {payments.income.map((item) => (
            <div className={cn(styles.cardInner, styles.income)}>
              <p> {item.date} </p>
              <span> £{item.cost}</span>
            </div>
          ))}
        </div>

        {/* Outcome */}
        <div className={styles.card}>
          {payments.outcome.map((item) => (
            <div className={cn(styles.cardInner, styles.outcome)}>
              <p> {item.date} </p>
              <span> {item.cost}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PaymentOverview;
