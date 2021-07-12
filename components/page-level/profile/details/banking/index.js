import Link from "next/link";
import DirectedButton from "@sub/button-directed";
import StripeConnectButton from "@sub/button-stripe-connect";
import StripeDisconnectButton from "@sub/button-stripe-disconnect";
import ToolTip from "@sub/tooltip";
import styles from "./banking.module.css";

function Banking() {
  return (
    <div className={styles.bankingContent}>
      {/* Show All Buttons for now, conditionally render later */}
      <div className={styles.bankingContentItem}>
        <StripeConnectButton />
        <ToolTip text="Want to receive payments from Clubbie? Connect with stripe" />
      </div>
      <div className={styles.bankingContentItem}>
        <StripeDisconnectButton />
      </div>
      <div className={styles.bankingContentItem}>
        <div className={styles.connectedBankAcc}>
          <Link href="/connected-banks">
            <a>
              <DirectedButton direction="forward">
                Connected Bank Accounts
              </DirectedButton>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banking;
