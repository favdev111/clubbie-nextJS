import React, { useState } from "react";
import TemplateInput from "@sub/input";
import Alert from "@sub/alert";
import Button from "@sub/button";
import Link from "next/link";
import Auth from "@api/services/Auth";
import styles from "./resetPassword.module.css";
import router from "next/router";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({
    type: null,
    text: null,
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value.trim();
    const resetPasswordCode = e.target.resetPasswordCode.value.trim();
    const password = e.target.password.value.trim();
    if (!/.+@.+\..+/.test(email)) {
      setStatusMsg({ type: "error", text: "Invalid Email Address" });
      setLoading(false);
      return;
    }

    await Auth.ResetPassword({ email, resetPasswordCode, password })
      .then((res) => {
        console.log("res => ", res);
        setLoading(false);
        setStatusMsg({
          type: "success",
          text: "Password Reset Successfull",
        });
        setTimeout(function () {
          // router.push("/auth/reset-password");
          console.log("redirecting after 5 seconds");
        }, 5000);
      })
      .catch((err) => {
        setStatusMsg({
          type: "error",
          text: err?.response?.data?.message?.includes("must be a valid email")
            ? "Invalid Email"
            : err?.response?.data?.message || "Some Error Occured",
        });
      });
    setLoading(false);
  };

  return (
    <div className={styles.recoverBlock}>
      <h1 className={styles.title}>Reset Password</h1>
      <form onSubmit={handleOnSubmit} className={styles.formRecover}>
        <TemplateInput
          type="email"
          name="email"
          required
          placeholder="Your Email Address"
        />
        <TemplateInput
          type="text"
          name="resetPasswordCode"
          required
          placeholder="Reset Password Code"
        />
        <TemplateInput
          type="password"
          name="password"
          required
          placeholder="Your New Password"
        />
        {statusMsg?.text && (
          <Alert variant={statusMsg.type} text={statusMsg.text} />
        )}
        <div className={styles.formSubmit}>
          <Button loading={loading}>Reset</Button>
        </div>
      </form>

      <Link href="/auth/forgot-password">
        <div className={styles.toLogin}>
          <a className="signUp">Request a Reset Code</a>
        </div>
      </Link>
    </div>
  );
};

export default ResetPassword;
