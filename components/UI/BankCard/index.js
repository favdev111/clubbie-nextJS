import React from "react";
import ForwardButton from "../ForwardButton";
import styles from "./bankcard.module.scss"

function BankCard({ data }) {
  return (
    <div className={styles.bankcard}>
      <div className={styles.bankcardInner}>
        <p className={styles.bankcardNo}>**** **** **** 6574</p>
        <div className={styles.bankcardExp}>
          EXP<p>10/12</p>
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
