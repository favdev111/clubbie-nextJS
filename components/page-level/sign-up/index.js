import React from "react";
import TemplateInput from "@sub/input";
import Button from "@sub/button";
import Link from "next/link";
import styles from "./signup.module.css";

const SignUp = () => {
  return (
    <div className={styles.signupBlock}>
      <h1 className={styles.title}>Sign Up</h1>

      <form action="#" className={styles.formSignup}>
        <TemplateInput type="text" placeholder="Your Email Address" />
        <TemplateInput type="password" placeholder="Choose a password" />
        <TemplateInput type="password" placeholder="Repeat password" />
      </form>
      <div className={styles.formAct}>
        <Button>Sign Up</Button>
      </div>

      <div className={styles.devideBlock}>
        <div className="line"></div>
        <div className={styles.text}>Or</div>
        <div className="line"></div>
      </div>

      <div className={styles.socialSignin}>
        <Link href="/social-signin-fb">
          <a>
            <img
              className={styles.iconFacebook}
              src="/assets/facebook.svg"
              alt=""
            />
          </a>
        </Link>
        <Link href="/social-signin-g">
          <a>
            <img className={styles.iconGoogle} src="assets/google.svg" alt="" />
          </a>
        </Link>
      </div>

      <Link href="/login">
        <div className={styles.signUp}>
          <a className="signUp">Go to Login</a>
        </div>
      </Link>
    </div>
  );
};
export default SignUp;
