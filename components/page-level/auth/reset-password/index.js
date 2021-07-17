import React, { useState, useEffect } from "react";
import TemplateInput from "@sub/input";
import Alert from "@sub/alert";
import Button from "@sub/button";
import Link from "next/link";
import Auth from "@api/services/Auth";
import authUser from "@utils/helpers/auth";
import styles from "./resetPassword.module.css";
import { useRouter } from "next/router";
import useForm from "@sub/hook-form";
import { resetPassword as resetPasswordSchema } from "@utils/schemas/auth.schema";

const ResetPassword = () => {
  const router = useRouter();
  const email = router?.query?.email;

  const { register, handleSubmit, errors, setValue } = useForm({
    schema: resetPasswordSchema,
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({
    type: null,
    text: null,
  });

  useEffect(() => {
    setValue("email", email);
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

  const onSubmit = async (data) => {
    setLoading(true);

    const { email, resetPasswordCode, password } = data;

    await Auth.ResetPassword({ email, resetPasswordCode, password })
      .then((res) => {
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
          className={styles.inputBox}
        />
        <TemplateInput
          type="text"
          name="resetPasswordCode"
          placeholder="Reset Password Code"
          customProps={{ ...register("resetPasswordCode") }}
          hint={
            errors?.resetPasswordCode && {
              type: "error",
              msg: errors?.resetPasswordCode?.message,
              inputBorder: true,
            }
          }
          className={styles.inputBox}
        />
        <TemplateInput
          type="password"
          name="password"
          placeholder="Your New Password"
          customProps={{ ...register("password") }}
          hint={
            errors?.password && {
              type: "error",
              msg: errors?.password?.message,
              inputBorder: true,
            }
          }
          className={styles.inputBox}
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
        <a>
          <div className={styles.toLogin}>
            <a className="signUp">Request a Reset Code</a>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ResetPassword;
