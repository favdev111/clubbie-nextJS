import React from "react";
import Button from "@sub/button";
import Link from "next/link";
import styles from "./logout.module.css";

const Logout = () => {
  return (
    <div className={styles.logoutBlock}>
      <h1 className={styles.title}>Logged Out</h1>

      <div className={styles.textBlock}>
        <p className="opacity-50 text-center">Thank you for using Clubbie</p>
      </div>
      <div className={styles.btnLogin}>
        <Button>Login</Button>
      </div>
      <div className={styles.devideBlock}>
        <div className="line"></div>
        <a className={styles.text}>Or</a>
        <div className="line"></div>
      </div>

      <div className={styles.socialLogin}>
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
            <img
              className={styles.iconGoogle}
              src="/assets/google.svg"
              alt=""
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Logout;
