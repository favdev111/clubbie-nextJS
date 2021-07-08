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
import useForm from "@sub/hook-form";
import { signup as signupSchema } from "@utils/schemas/auth.schema";

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    schema: signupSchema,
  });

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);

    const { email, password } = data;

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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formSignup}>
        <TemplateInput
          type="email"
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
        />
        <TemplateInput
          type="password"
          placeholder="Choose a password"
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
        <TemplateInput
          type="password"
          placeholder="Repeat password"
          name="passwordConfirm"
          customProps={{ ...register("passwordConfirm") }}
          hint={
            errors?.passwordConfirm && {
              type: "error",
              msg: errors?.passwordConfirm?.message,
              inputBorder: true,
            }
          }
        />
        <div className={styles.alertbox}>
          {error && <Alert variant="error" text={error} />}
        </div>
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
