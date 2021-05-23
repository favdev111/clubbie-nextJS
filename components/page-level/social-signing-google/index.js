import React from "react";
import TemplateInput from "@sub/input";
import Button from "@sub/button";
import Link from "next/link";
import styles from "./socialSigninG.module.css";

const SocialSigninG = () => {
  return (
    <div className={styles.socSignBlock}>
      <img className={styles.iconGoogle} src="/assets/google.svg" alt="" />
      <h2 className={styles.title}>Sign up via Google</h2>

      <form action="#" className={styles.formLogin}>
        <TemplateInput type="text" placeholder="Enter Google Email" />
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

export default SocialSigninG;
