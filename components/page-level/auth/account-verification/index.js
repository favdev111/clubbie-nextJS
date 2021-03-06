import React, { useState, useEffect } from "react";
import Router from "next/router";
import Alert from "@sub/alert";
import Button from "@sub/button";
import TemplateInput from "@sub/input";
import Auth from "@api/services/Auth";
import authUser from "@utils/helpers/auth";
import styles from "./accountVerif.module.css";
import useForm from "@sub/hook-form";
import { activateAccount as activateAccountSchema } from "@utils/schemas/auth.schema";

const AccountVerif = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [activationStatus, setActivationStatus] = useState({
    type: null,
    text: null,
  });
  const [resendStatus, setResendStatus] = useState({
    type: null,
    text: null,
  });
  const [countDown, setCountDown] = useState(0);

  const { register, handleSubmit, errors } = useForm({
    schema: activateAccountSchema,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setActivationStatus({ type: null, text: null });

    const { activationCode } = data;

    // make api call
    await Auth.ActivateAccount({ activationCode })
      .then((res) => {
        authUser.setUser(res.data.user); // Todo: make this cookie to not expire
        setActivationStatus({
          type: "success",
          text: "Account Activated Successfully.! Redirecting...",
        });
        setLoading(false);
        Router.push("/"); // redirect to home
      })
      .catch((err) => {
        setActivationStatus({
          type: "error",
          text:
            err?.response?.data?.message ||
            err?.message ||
            err?.request ||
            "Some Error Occured",
        });
      });
    setLoading(false);
  };

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
    const email =
      user?.local?.email ||
      user?.apple?.email ||
      user?.google?.email ||
      user?.facebook?.email;

    await Auth.ResendActivationCode({ email })
      .then((res) => {
        setCountDown(60);
        setResendStatus({
          type: "success",
          text:
            "We have sent you an activation code. You can request another in 60 seconds",
        });
      })
      .catch((err) => {
        setResendStatus({ type: "error", text: err.response.data.message });
      });
  };

  return (
    <div className={styles.verifBlock}>
      <h1 className={styles.title}>Account Verification</h1>

      <div className={styles.textBlock}>
        <p className="opacity-50">
          Please enter your the 6-digit code we sent you by email.
        </p>
        <p className="opacity-50">
          Verification only takes a few minutes, helps secure your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formVerif}>
        <TemplateInput
          type="text"
          placeholder="Enter Verification Code"
          name="activationCode"
          customProps={{ ...register("activationCode") }}
          hint={
            errors?.activationCode && {
              type: "error",
              msg: errors?.activationCode?.message,
              inputBorder: true,
            }
          }
        />

        {activationStatus?.text && (
          <div className={styles.alertBox}>
            <Alert
              variant={activationStatus.type}
              text={activationStatus.text}
            />
          </div>
        )}
        <div className={styles.btnVerif}>
          <Button loading={loading}>Verify</Button>
        </div>
      </form>

      <div className={styles.resendCodeMsg}>
        {!!countDown && resendStatus?.text ? (
          <div className={styles.resendStatus}>
            <Alert variant={resendStatus?.type} text={resendStatus?.text} />
          </div>
        ) : (
          <>
            Didn't receive the activation code?
            <p className="signUp" onClick={handleResendClick}>
              &ensp;Resend
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountVerif;
