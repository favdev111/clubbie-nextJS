import React, { useEffect } from "react";
import Link from "next/link";
import Button from "@sub/button";
import FacebookLogin from "@sub/button-facebook-auth/index";
import GoogleLogin from "@sub/button-google-auth/index";
import Auth from "@api/services/Auth";
import authUser from "@utils/helpers/auth";
import styles from "./logout.module.css";

const Logout = () => {
  useEffect(async () => {
    await Auth.Logout({ refreshToken: authUser.getRefreshToken() })
      .then(() => null)
      .catch(() => null);
    authUser.deleteUser();
    authUser.deleteAccessToken();
    authUser.deleteRefreshToken();
  }, []);

  return (
    <div className={styles.logoutBlock}>
      <h1 className={styles.title}>Logged Out</h1>

      <div className={styles.textBlock}>
        <p className="opacity-50 text-center">Thank you for using Clubbie</p>
      </div>
      <div className={styles.btnLogin}>
        <Link href="/auth/login">
          <a>
            <Button>Login</Button>
          </a>
        </Link>
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
