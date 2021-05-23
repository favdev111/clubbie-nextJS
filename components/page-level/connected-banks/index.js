import React from "react";
import BankCard from "./card";
import OvalButton from "@sub/button-oval";
import styles from "./connectedbanks.module.css";

function ConnectedBanks() {
  const data = [
    {
      id: 0,
      exp: "10/12",
      card: "**** **** **** 6574",
      default: true,
    },
    {
      id: 0,
      exp: "10/12",
      card: "**** **** **** 5433",
      default: false,
    },
  ];
  return (
    <div className={styles.connectedbanks}>
      <div className={styles.connectedbanksTitle}>
        <h1> Connected Bank Accounts</h1>
      </div>
      <div className={styles.connectedbanksBody}>
        <div className={styles.connectedbanksBodyInner}>
          {data.map((card, index) => (
            <BankCard key={"bankcard" + index} data={card} />
          ))}
        </div>
        <div className={styles.connectedbanksButton}>
          <OvalButton theme="bank">Add New</OvalButton>
        </div>
      </div>
    </div>
  );
}

export default ConnectedBanks;
