import React, { useState } from "react";
import cookie from "js-cookie";
import Link from "next/link";
import Router from "next/router";
import Alert from "@material-ui/lab/Alert";
import FacebookLogin from "@sub/button-facebook-auth/index";
import GoogleLogin from "@sub/button-google-auth/index";
import TemplateInput from "@sub/input";
import Button from "@sub/button";
import Auth from "@api/services/Auth";
import styles from "./signup.module.css";

// TODO: redirect if already logged in
const SignUp = () => {
  const [error, setError] = useState("");

  const handleOnSubmit = (e) => {
    // handle client side errors
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;
    if (!/.+@.+\..+/.test(email)) {
      setError("Invalid Email Address");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Passwords Don't Match");
      return;
    }

    // make api call
    Auth.SignUp({
      email,
      password,
    })
      .then((res) => {
        cookie.set("user", JSON.stringify(res.data.user), {
          expires: new Date(res.data.tokens.access.expiry),
        });
        cookie.set("access_token", res.data.tokens.access.token, {
          expires: new Date(res.data.tokens.access.expiry),
        });
        cookie.set("refresh_token", res.data.tokens.refresh.token, {
          expires: new Date(res.data.tokens.refresh.expiry),
        });
        setError("");
        Router.push("/auth/account-verification"); // redirect to verification
      })
      .catch((err) => {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            err?.request ||
            "Some Error Occured"
        );
      });
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
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
        <div className={styles.signupButton}>
          <Button>Sign Up</Button>
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

      <Link href="/login">
        <div className={styles.signUp}>
          Already have an account?<a className="signUp">&ensp;Login Here</a>
        </div>
      </Link>
    </div>
  );
};
export default SignUp;
