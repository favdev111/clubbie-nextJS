import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import Alert from "@sub/alert";
import FacebookLogin from "@sub/button-facebook-auth/index";
import GoogleLogin from "@sub/button-google-auth/index";
import TemplateInput from "@sub/input";
import Button from "@sub/button";
import Auth from "@api/services/Auth";
import authUser from "@utils/helpers/auth";
import styles from "./signup.module.css";

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    // handle client side errors
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;
    if (!/.+@.+\..+/.test(email)) {
      setError("Invalid Email Address");
      setLoading(false);

      return;
    }
    if (password !== passwordConfirm) {
      setError("Passwords Don't Match");
      setLoading(false);

      return;
    }

    // make api call
    await Auth.SignUp({
      email,
      password,
    })
      .then((res) => {
        authUser.setUser(res.data.user, {
          expires: new Date(res.data.tokens.refresh.expiry),
        });
        authUser.setAccessToken(res.data.tokens.access.token, {
          expires: new Date(res.data.tokens.access.expiry),
        });
        authUser.setRefreshToken(res.data.tokens.refresh.token, {
          expires: new Date(res.data.tokens.refresh.expiry),
        });
        setError("");
        setLoading(false);
        Router.push("/auth/account-confirmation"); // redirect to confirmation
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
    <div className={styles.signupBlock}>
      <h1 className={styles.title}>Sign Up</h1>
      <form onSubmit={handleOnSubmit} className={styles.formSignup}>
        <TemplateInput
          type="email"
          placeholder="Your Email Address"
          name="email"
          required
        />
        <TemplateInput
          type="password"
          placeholder="Choose a password"
          name="password"
          required
        />
        <TemplateInput
          type="password"
          placeholder="Repeat password"
          name="passwordConfirm"
          required
        />
        {error && <Alert variant="error" text={error} />}
        <div className={styles.signupButton}>
          <Button loading={loading}>Sign Up</Button>
        </div>
      </form>

      <div className={styles.devideBlock}>
        <div className="line"></div>
        <div className={styles.text}>Or</div>
        <div className="line"></div>
      </div>

      <div className={styles.socialSignin}>
        <FacebookLogin />
        <GoogleLogin />
      </div>

      <div className={styles.signUp}>
        Already have an account?
        <Link href="/auth/login">
          <a className="signUp">&ensp;Login Here</a>
        </Link>
      </div>
    </div>
  );
};
export default SignUp;
