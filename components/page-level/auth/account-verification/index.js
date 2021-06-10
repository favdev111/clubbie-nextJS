import React, { useState } from "react";
import Button from "@sub/button";
import TemplateInput from "@sub/input";
import styles from "./accountVerif.module.css";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { verifyAccount } from "@redux/auth.slice";

const AccountVerif = () => {
  // TODO: redirect to home/somewhere after verification

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const verifyAccError = useSelector(
    (state) => state.auth.errors.verifyAccError
  );
  const [error, setError] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const activationCode = e.target.activationCode.value;
    if (activationCode.length < 6) {
      setError("Invalid Activation Code");
      return;
    }
    setError("");
    dispatch(verifyAccount({ activationCode }));
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

        {(error || verifyAccError) && (
          <Alert variant="filled" severity="error">
            {error || verifyAccError}
          </Alert>
        )}
        <div className={styles.btnVerif}>
          <Button width="142px" height="52px">
            Verify
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountVerif;
