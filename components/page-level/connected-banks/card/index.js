import React from "react";
import ForwardButton from "@sub/button-forward";
import styles from "./bankcard.module.css";

function BankCard({ data }) {
  return (
    <div className={styles.bankcard}>
      <div className={styles.bankcardInner}>
        <p className={styles.bankcardNo}>{data.card}</p>
        <div className={styles.bankcardExp}>
          <p className="opacity-50">EXP</p>
          <p>{data.exp}</p>
        </div>
        <img src="/assets/mastercard.svg" />
      </div>
      <div className={styles.bankcardDefault}>
        {data.default ? (
          <p className="opacity-50">Default</p>
        ) : (
          <ForwardButton appearence="bank"> Set Default</ForwardButton>
        )}
      </div>
    </div>
  );
}

export default BankCard;
