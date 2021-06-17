import React from "react";
import styles from "./index.module.css";
import TableRow from "../payment-table/row";
import Head from "../payment-table/head";
import PaymentCell from "../payment-table/cell";

function PaymentsSubscriptions() {
  const duePayments = [
    { date: "01/02/2012", event: "Shottery v Stafford", amount: "£4.5" },
    { date: "01/02/2012", event: "Shottery v Stafford", amount: "£4.5" },
    { date: "01/02/2012", event: "Shottery v Stafford", amount: "£4.5" },
  ];
  return (
    <div className={styles.subscriptions}>
      {/* Next subs card */}
      <div className={styles.fix}></div>
      <div className={styles.subsCard}>
        <div className={styles.header}>
          <h3> Next subscriptions payment</h3>
          <h3> £25.00</h3>
        </div>
        <div className={styles.detail}>
          <div className={styles.grid}>
            <div className={styles.cell}>
              <p className="opacity-50">Subscription</p>
              <p> Adult First Team</p>
            </div>
            <div className={styles.cell}>
              <p className="opacity-50">Due date</p>
              <p>01/04/2021</p>
            </div>
            <div className={styles.cell}>
              <p className="opacity-50">Payment method</p>
              <p>Automated card payment</p>
            </div>
          </div>
          <div className={styles.detailBelow}>
            <button className={styles.button}>
              Cancel or change payment method
            </button>
          </div>
        </div>
      </div>
      {/* Past Payments */}

      {/* past payments */}
      <div>
        <h3>Past Payments</h3>
        <div className={styles.pastPaymentTable}>
          {/* Header */}
          <TableRow>
            <Head />
          </TableRow>
          {/* Table */}
          {duePayments.map((item) => (
            <TableRow tableItem>
              <PaymentCell> {item.date} </PaymentCell>
              <PaymentCell span="3"> {item.event} </PaymentCell>
              <PaymentCell> {item.amount} </PaymentCell>
            </TableRow>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PaymentsSubscriptions;
