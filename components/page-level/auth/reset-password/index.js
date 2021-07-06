import React, { useState, useEffect } from "react";
import TemplateInput from "@sub/input";
import Alert from "@sub/alert";
import Button from "@sub/button";
import Link from "next/link";
import Auth from "@api/services/Auth";
import authUser from "@utils/helpers/auth";
import styles from "./resetPassword.module.css";
import { useRouter } from "next/router";

const ResetPassword = () => {
  const router = useRouter();
  const email = router?.query?.email;

  const [_email, setEmail] = useState(email || "");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({
    type: null,
    text: null,
  });

  useEffect(() => {
    setEmail(email);
  }, [email]);

  useEffect(async () => {
    if (statusMsg.type === "success") {
      await Auth.Logout({ refreshToken: authUser.getRefreshToken() })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      authUser.deleteUser();
      authUser.deleteAccessToken();
      authUser.deleteRefreshToken();
    }
  }, [statusMsg]);

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
          text: "Password Reset Successfull.! Redirecting",
          animateText: true,
        });
        setTimeout(function () {
          router.push("/auth/login");
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
          value={_email}
          onChange={(e) => setEmail(e.target.value)}
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
          <Alert
            variant={statusMsg.type}
            text={statusMsg.text}
            animateText={statusMsg?.animateText}
          />
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
