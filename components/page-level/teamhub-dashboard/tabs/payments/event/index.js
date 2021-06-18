import React from "react";
import styles from "./index.module.css";

import TableRow from "../payment-table/row";
import Head from "../payment-table/head";
import PaymentCell from "../payment-table/cell";
import CheckBox from "@sub/checkbox";

function EventsPayments() {
  const duePayments = [
    { date: "01/02/2012", event: "Shottery v Stafford", amount: "£4.5" },
    { date: "01/02/2012", event: "Shottery v Stafford", amount: "£4.5" },
    { date: "01/02/2012", event: "Shottery v Stafford", amount: "£4.5" },
  ];
  return (
    <div className={styles.allPayments}>
      {/* due payments */}
      <div className={styles.duePayments}>
        <h3>Due Payments</h3>
        {/* Table Head */}
        <div className={styles.duePaymentTable}>
          <TableRow>
            <Head select />
          </TableRow>
          {/* Table  */}
          {duePayments.map((item) => (
            <TableRow wkey={item + Math.random()} tableItem>
              <PaymentCell> {item.date} </PaymentCell>
              <PaymentCell span="2"> {item.event} </PaymentCell>
              <PaymentCell> {item.amount} </PaymentCell>
              <PaymentCell center>
                <CheckBox />
              </PaymentCell>
            </TableRow>
          ))}
          <TableRow>
            <PaymentCell> Due payments total</PaymentCell>
            <PaymentCell span="2" />
            <PaymentCell> £29.50</PaymentCell>
            <PaymentCell center>
              <CheckBox />
            </PaymentCell>
          </TableRow>
          <div className={styles.buttons}>
            <button className={styles.paid}> Already paid</button>
            <button className={styles.pay}> Pay £34.00 now</button>
          </div>
        </div>
      </div>

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

export default EventsPayments;
