import React from "react";
import Button from "@sub/button";
import FacebookLogin from "@sub/button-facebook-auth/index";
import GoogleLogin from "@sub/button-google-auth/index";
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
        <FacebookLogin />
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Logout;
