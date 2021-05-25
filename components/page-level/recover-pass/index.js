import React from "react";
// import styles from "recoverPass.module.css";
import TemplateInput from "@sub/input";
import Button from "@sub/button";
import Link from "next/link";
import styles from "./recoverPass.module.css";

const RecoverPass = () => {
  return (
    <div className={styles.recoverBlock}>
      <h1 className={styles.title}>Forgot Password</h1>

      <div className={styles.textBlock}>
        <p className="opacity-50 text-center">
          Enter your email address and we will send you instructions on how to
          recover your account
        </p>
      </div>
      <form action="#" className={styles.formRecover}>
        <TemplateInput type="email" placeholder="Your Email Address" />
      </form>

      <div className={styles.formSubmit}>
        <Button>Submit</Button>
      </div>

      <Link href="/login">
        <div className={styles.toLogin}>
          <a className="signUp">Go back to Login</a>
        </div>
      </Link>
    </div>
  );
};

export default RecoverPass;
