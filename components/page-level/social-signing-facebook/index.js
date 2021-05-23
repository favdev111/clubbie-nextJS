import React from "react";
import TemplateInput from "@sub/input";
import Button from "@sub/button";
import Link from "next/link";
import styles from "./socialSigninFB.module.css";

const SocialSigninFB = () => {
  return (
    <div className={styles.socSignBlock}>
      <img className={styles.iconFacebook} src="/assets/facebook.svg" alt="" />
      <h2 className={styles.title}>Sign up via Facebook</h2>

      <form action="#" className={styles.formLogin}>
        <TemplateInput type="text" placeholder="Enter Email or UserID" />
        <TemplateInput type="password" placeholder="Password" />
      </form>

      <div className={styles.formAct}>
        <Button>Sign Up</Button>
      </div>

      <Link href="/login">
        <div className={styles.toLogin}>
          <a className="signUp">Go back to Login</a>
        </div>
      </Link>
    </div>
  );
};

export default SocialSigninFB;
