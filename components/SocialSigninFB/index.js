import React from "react";
import TemplateInput from "../UI/Input";
import Button from "../UI/Button";
import Link from "next/link";
import styles from "./socialSigninFB.module.css";

const SocialSigninFB = () => {
  return (
    <div className={styles.socSignBlock}>
      <img className={styles.iconFacebook} src="/assets/facebook.svg" alt="" />
      <h1 className={styles.title}>Sign up via Facebook</h1>

      <form action="#" className={styles.formLogin}>
        <TemplateInput type="text" placeholder="Enter Email or UserID" />
        <TemplateInput type="password" placeholder="Password" />
      </form>

      <div className={styles.formAct}>
        <Button>Sign Up</Button>
      </div>

      <div>
        <Link href="/login">
          <a className={styles.toLogin}>Go back to Login</a>
        </Link>
      </div>
    </div>
  );
};

export default SocialSigninFB;
