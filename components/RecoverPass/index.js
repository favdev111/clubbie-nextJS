import React from "react";
// import styles from "recoverPass.module.css";
import TemplateInput from "../UI/Input/index";
import Button from "../UI/Button/index";
import Link from "next/link";
import styles from "./recoverPass.module.css";

const RecoverPass = () => {
  return (
    <div className={styles.recoverBlock}>
      <h1 className={styles.title}>Forgot Password</h1>

      <div className={styles.textBlock}>
        <p className={styles.text}>
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

      <div>
        <Link href="/login">
          <a className={styles.toLogin}>Go back to Login</a>
        </Link>
      </div>
    </div>
  );
};

export default RecoverPass;
