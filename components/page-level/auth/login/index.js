import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Alert from "@sub/alert";
import FacebookLogin from "@sub/button-facebook-auth/index";
import TemplateInput from "@sub/input";
import GoogleLogin from "@sub/button-google-auth/index";
import Button from "@sub/button";
import Auth from "@api/services/Auth";
import authUser from "@utils/helpers/auth";
import styles from "./login.module.css";

// TODO: redirect if already logged in
const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!/.+@.+\..+/.test(email)) {
      setError("Invalid Email Address");
      setLoading(false);
      return;
    }
    setError("");

    // make api call
    await Auth.Login({
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
        router.push("/");
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
        {error && <Alert variant="error" text={error} />}
        <div className={styles.formAct}>
          <Link href="/auth/forgot-password">
            <span className={styles.whiteColor}>Forgot Password?</span>
          </Link>
          <Button loading={loading}>Login</Button>
        </div>
      </form>

      <div className={styles.devideBlock}>
        <div className="line"></div>
        <a className={styles.text}>Or</a>
        <div className="line"></div>
      </div>

      <div className={styles.socialSignin}>
        <FacebookLogin />
        <GoogleLogin />
      </div>

      <div className={styles.signUpMsg}>
        Don’t have an Account?{" "}
        <Link href="/auth/sign-up">
          <a className="signUp">&ensp;Sign Up</a>
        </Link>
      </div>
    </div>
  );
};
export default Login;
