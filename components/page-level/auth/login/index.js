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
import useForm from "@sub/hook-form";
import { loginWithLocal } from "@utils/schemas/auth.schema";

const Login = ({ previousURL }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    schema: loginWithLocal,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    const { email, password } = data;

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
        router.push(previousURL || "/");
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

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formLogin}>
        <TemplateInput
          type="text"
          placeholder="Your Email Address"
          name="email"
          customProps={{ ...register("email") }}
          hint={
            errors?.email && {
              type: "error",
              msg: errors?.email?.message,
              inputBorder: true,
            }
          }
          className={styles.inputMargin}
        />
        <TemplateInput
          type="password"
          placeholder="Password"
          name="password"
          customProps={{ ...register("password") }}
          hint={
            errors?.password && {
              type: "error",
              msg: errors?.password?.message,
              inputBorder: true,
            }
          }
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
          <a className={styles.signUp}>&ensp;Sign Up</a>
        </Link>
      </div>
    </div>
  );
};
export default Login;
