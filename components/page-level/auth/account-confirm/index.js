import React from "react";
import styles from "./accountConfirm.module.css";
import Button from "@sub/button";

const AccountConfirm = ({ user }) => {
  return (
    <div className={styles.confirmBlock}>
      <h1 className="text-center">Confirm your account</h1>

      <div className={styles.textBlock}>
        <p className={styles.text}>
          Please verify your email address so you can sign in if you ever forget
          your password. We've sent a confirmation email to
          <span className={styles.confEmail}>{user?.local?.email}</span>
        </p>
        <br />
        <br />
        <p className={styles.text}>
          If you still don't see it, you can resend the confirmation email
        </p>
      </div>

      <div className={styles.btnConfirm}>
        <Button>Resend</Button>
        {/*         <button onClick={() => Router.push("/auth/account-verification")}> Confirm</button>
         */}{" "}
      </div>
    </div>
  );
};

export default AccountConfirm;
