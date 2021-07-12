import React from "react";
import BankCard from "./card";
import styles from "./connectedbanks.module.css";
import OvalButton from "@sub/button-oval";

function ConnectedBanks({ data }) {
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
