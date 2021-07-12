import React from "react";
import styles from "./bankcard.module.css";
import DirectedButton from "@sub/button-directed";
import Mastercard from "@svg/mastercard";

function BankCard({ payMethod }) {
  return (
    <div className={styles.bankcard}>
      <div className={styles.bankcardInner}>
        <p className={styles.bankcardNo}>
          {"**** **** **** " + payMethod?.card?.last4}
        </p>
        <div className={styles.bankcardExp}>
          <p className="opacity-50">EXP</p>
          <p>
            {payMethod?.card?.exp_month}/{payMethod?.card?.exp_year}
          </p>
        </div>
        {payMethod?.card?.brand === "visa" && <Mastercard />}
      </div>
      <div className={styles.bankcardDefault}>
        {payMethod?.isDefault ? (
          <p className="opacity-50">Default</p>
        ) : (
          <DirectedButton appearence="bank" direction="forward">
            Set Default
          </DirectedButton>
        )}
      </div>
    </div>
  );
}

// function BankCard({ data }) {
//   console.log("data => ", data);
//   return (
//     <div className={styles.bankcard}>
//       <div className={styles.bankcardInner}>
//         <p className={styles.bankcardNo}>{data.card}</p>
//         <div className={styles.bankcardExp}>
//           <p className="opacity-50">EXP</p>
//           <p>{data.exp}</p>
//         </div>
//         <Mastercard />
//       </div>
//       <div className={styles.bankcardDefault}>
//         {data.default ? (
//           <p className="opacity-50">Default</p>
//         ) : (
//           <DirectedButton appearence="bank" direction="forward">
//             Set Default
//           </DirectedButton>
//         )}
//       </div>
//     </div>
//   );
// }

export default BankCard;
