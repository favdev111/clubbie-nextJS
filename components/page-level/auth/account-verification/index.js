import React, { useState } from "react";
import Router from "next/router";
import Alert from "@sub/alert";
import Button from "@sub/button";
import TemplateInput from "@sub/input";
import Auth from "@api/services/Auth";
import HTTPClient from "@api/HTTPClient";
import authUser from "@utils/helpers/auth";
import styles from "./accountVerif.module.css";

// TODO: redirect if not logged in
const AccountVerif = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const activationCode = e.target.activationCode.value;
    if (activationCode.length < 6) {
      setError("Invalid Activation Code");
      setLoading(false);
      return;
    }
    setError("");

    // make api call
    await Auth.ActivateAccount({ activationCode })
      .then((res) => {
        authUser.setUser(res.data.user); // Todo: make this cookie to not expire
        setError("");
        setLoading(false);
        Router.push("/"); // redirect to home
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            err?.request ||
            "Some Error Occured"
        );
      });
    setLoading(false);
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

      <form onSubmit={handleOnSubmit} className={styles.formVerif}>
        <TemplateInput
          type="text"
          placeholder="Enter Verification Code"
          name="activationCode"
          required
        />

        {error && <Alert variant="error" text={error} />}
        <div className={styles.btnVerif}>
          <Button loading={loading}>Verify</Button>
        </div>
      </form>
    </div>
  );
};

export default AccountVerif;
