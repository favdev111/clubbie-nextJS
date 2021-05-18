import React from "react";
import ForwardButton from "../ForwardButton";
import styles from "./bankcard.module.css";

function BankCard({ data }) {
  return (
    <div className={styles.bankcard}>
      <div className={styles.bankcardInner}>
        <p className={styles.bankcardNo}>{data.card}</p>
        <div className={styles.bankcardExp}>
          EXP<p>{data.exp}</p>
        </div>
        <img src="/assets/mastercard.svg" />
      </div>
      <div className={styles.bankcardDefault}>
        {data.default ? (
          <p>Default</p>
        ) : (
          <ForwardButton appearence="bank"> Set Default</ForwardButton>
        )}
      </div>
    </div>
  );
}

export default BankCard;
