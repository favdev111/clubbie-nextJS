import React, { useEffect, useState } from "react";
import Router from "next/router";
import Alert from "@sub/alert";
import styles from "./accountConfirm.module.css";
import Button from "@sub/button";
import Auth from "@api/services/Auth";

const AccountConfirm = ({ user }) => {
  const [statusMsg, setStatusMsg] = useState({
    type: null,
    text: null,
  });
  const [loading, setLoading] = useState(false);
  const [countDown, setCountDown] = useState(0);

  useEffect(() => {
    if (countDown > 0) {
      let timer = countDown;
      const interval = setInterval(function () {
        if (timer > 0) {
          timer = timer - 1;
        } else if (timer === 0) {
          setCountDown(0);
          clearInterval(interval);
        }
      }, 1000);
    }
  }, [countDown]);

  const handleResendClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email =
      user?.local?.email ||
      user?.apple?.email ||
      user?.google?.email ||
      user?.facebook?.email;

    await Auth.ResendActivationCode({ email })
      .then((res) => {
        setCountDown(60);
        setStatusMsg({
          type: "success",
          text:
            "We have sent you an activation code. You can request another in 60 seconds",
        });
      })
      .catch((err) => {
        setStatusMsg({ type: "error", text: err.response.data.message });
      });
    setLoading(false);
  };

  return (
    <div className={styles.confirmBlock}>
      <h1 className="text-center">Confirm your account</h1>

      <div className={styles.textBlock}>
        <p className={styles.text}>
          Please verify your email address so you can sign in in case if you
          ever forget your password. We've sent a confirmation email to
          <span className={styles.confEmail}>{user?.local?.email}</span>
        </p>
        <br />
        <br />
        <p className={styles.text}>
          If you still don't see it, we can resend the confirmation email.
        </p>
        {!!countDown && statusMsg?.text && (
          <div className={styles.statusMsg}>
            <Alert variant={statusMsg?.type} text={statusMsg?.text} />
          </div>
        )}
      </div>

      <div className={styles.btnConfirm}>
        {!countDown && (
          <Button onClick={handleResendClick} loading={loading}>
            Resend
          </Button>
        )}
        <Button onClick={() => Router.push("/auth/account-verification")}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default AccountConfirm;
