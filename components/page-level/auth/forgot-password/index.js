import React, { useState } from "react";
import TemplateInput from "@sub/input";
import Alert from "@sub/alert";
import Button from "@sub/button";
import Link from "next/link";
import Auth from "@api/services/Auth";
import styles from "./forgotPassword.module.css";
import router from "next/router";
import useForm from "@sub/hook-form";
import { forgotPassword as forgotPasswordSchema } from "@utils/schemas/auth.schema";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({
    type: null,
    text: null,
  });

  const { register, handleSubmit, errors } = useForm({
    schema: forgotPasswordSchema,
  });

  const onSubmit = async (data) => {
    setLoading(true);

    const { email } = data;

    await Auth.ForgotPassword({ email })
      .then((res) => {
        setLoading(false);
        setStatusMsg({
          type: "success",
          text: "We have sent you an email for password recovery.! Redirecting",
          animateText: true,
        });
        setTimeout(function () {
          router.push(
            `/auth/reset-password/?email=${email}`,
            "/auth/reset-password"
          );
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
      <h1 className={styles.title}>Forgot Password</h1>

      <div className={styles.textBlock}>
        <p className="opacity-50 text-center">
          Enter your email address and we will send you instructions on how to
          recover your account
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formRecover}>
        <TemplateInput
          type="text"
          name="email"
          placeholder="Your Email Address"
          customProps={{ ...register("email") }}
          hint={
            errors?.email && {
              type: "error",
              msg: errors?.email?.message,
              inputBorder: true,
            }
          }
        />
        {statusMsg?.text && (
          <div className={styles.alertBox}>
            <Alert
              variant={statusMsg.type}
              text={statusMsg.text}
              animateText={statusMsg?.animateText}
            />
          </div>
        )}
        <div className={styles.formSubmit}>
          <Button loading={loading}>Submit</Button>
        </div>
      </form>

      <Link href="/auth/login">
        <div className={styles.toLogin}>
          <a className="signUp">Go back to Login</a>
        </div>
      </Link>
    </div>
  );
};

export default ForgotPassword;
