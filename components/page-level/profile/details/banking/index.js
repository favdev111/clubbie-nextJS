import Link from "next/link";
import DirectedButton from "@sub/button-directed";
import StripeConnectButton from "@sub/button-stripe-connect";
import styles from "./banking.module.css";

function Banking() {
  return (
    <div className={styles.bankingContent}>
      <div className={styles.bankingContentItem}>
        <StripeConnectButton />
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
