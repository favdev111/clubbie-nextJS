import React from "react";
import TemplateInput from "../UI/Input";
import Button from "../UI/Button";
import Link from "next/link";
import styles from "./signup.module.scss";

const SignUp = () => {
    return(
        <div className={styles.signupBlock}>
            <h1 className={styles.title}>Sign Up</h1>

            <form action="#" className={styles.formSignup}>
                <TemplateInput type="text" placeholder="Your Email Address" />
                <TemplateInput type="password" placeholder="Choose a password" />
                <TemplateInput type="password" placeholder="Repeat password" />
            </form>
            <div className={styles.formAct}>
                <Button>
                    Sign Up
                </Button>
            </div>

            <div className={styles.devideBlock}>
                <div className={styles.line}></div>
                <div className={styles.text}>Or</div>
                <div className={styles.line}></div>
            </div>

            <div className={styles.socialSignin}>
                <Link href="/social-signin-fb">
                    <a><img className={styles.iconFacebook} src={require('../../public/assets/facebook.svg')} alt=""/></a>
                </Link>
                <Link href="/social-signin-g">
                    <a><img className={styles.iconGoogle} src={require('../../public/assets/google.svg')} alt=""/></a>
                </Link>
            </div>

            <div>
                <Link href="/login"><a className={styles.toLogin}>Go to Login</a></Link>
            </div>

        </div>
    )
}
export default SignUp
