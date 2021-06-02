import React, { useState } from "react";
import TemplateInput from "@sub/input";
import Button from "@sub/button";
import Link from "next/link";
import styles from "./signup.module.css";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import Router from "next/router";
import FacebookLogin from "@sub/button-facebook-auth/index";
import GoogleLogin from "@sub/button-google-auth/index";
import { signup } from "@redux/auth.slice";

const SignUp = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  Object.keys(user).length > 0 && Router.push("/account-confirmation"); // redirect on signup

  const signupError = useSelector((state) => state.auth.errors.signupError);
  const [error, setError] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;
    if (!/.+@.+\..+/.test(email)) {
      setError("Invalid Email Address");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Paswords Don't Match");
      return;
    }
    setError("");
    dispatch(
      signup({
        email,
        password,
      })
    );
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
        {(error || signupError) && (
          <Alert variant="filled" severity="error">
            {error || signupError}
          </Alert>
        )}
        <div className={styles.formAct}>
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
