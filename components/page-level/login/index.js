import React, { useState } from "react";
import Button from "@sub/button";
import TemplateInput from "@sub/input";
import Link from "next/link";
import styles from "./login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { login } from "@redux/auth.slice";
import Alert from "@material-ui/lab/Alert";

const Login = () => {
  // TODO: redirect to home/somewhere after login

  const dispatch = useDispatch();

  const loginError = useSelector(
    (state) => state.auth.errors.loginError
  );
  const [error, setError] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!/.+@.+\..+/.test(email)) {
      setError("Invalid Email Address");
      return;
    }
    setError("");
    dispatch(
      login({
        email,
        password,
      })
    );
  };

  return (
    <div className={styles.loginBlock}>
      <h1 className={styles.title}>Login</h1>

      <form onSubmit={handleOnSubmit} className={styles.formLogin}>
        <TemplateInput
          type="text"
          placeholder="Your Email Address"
          name="email"
          required
        />
        <TemplateInput
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        {(error || loginError) && (
          <Alert variant="filled" severity="error">
            {error || loginError}
          </Alert>
        )}
        <div className={styles.formAct}>
          <Link href="/recovery-pass">
            <a className={styles.forgotPass}>Forgot Password?</a>
          </Link>
          <Button>Login</Button>
        </div>
      </form>

      <div className={styles.devideBlock}>
        <div className="line"></div>
        <a className={styles.text}>Or</a>
        <div className="line"></div>
      </div>

      <div className={styles.socialSignin}>
        <Link href="/social-signin-fb">
          <a>
            <img
              className={styles.iconFacebook}
              src="/assets/facebook.svg"
              alt=""
            />
          </a>
        </Link>
        <Link href="/social-signin-g">
          <a>
            <img
              className={styles.iconGoogle}
              src="/assets/google.svg"
              alt=""
            />
          </a>
        </Link>
      </div>

      <Link href="/sign-up">
        <div className="signupContent">
          <a className="signUp">Don’t have an Account? Sign Up</a>
        </div>
      </Link>
    </div>
  );
};
export default Login;
