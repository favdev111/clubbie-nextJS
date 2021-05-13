import React from "react";
import Button from "../UI/Button";
import TemplateInput from "../UI/Input";
import Link from "next/link";
import styles from './login.module.scss';

const Login = () => {
    return(
        <div className={styles.loginBlock}>
            <h1 className={styles.title}>Login</h1>

            <form action="#" className={styles.formLogin}>
                <TemplateInput type="text" placeholder="Your Email Address" />
                <TemplateInput type="password" placeholder="Password" />
            </form>

            <div className={styles.formAct}>
                <Link href='/recovery-pass'>
                    <a className={styles.forgotPass}>Forgot Password?</a>
                </Link>
                <Button>
                    Login
                </Button>
            </div>

            <div className={styles.devideBlock}>
                <div className={styles.line}></div>
                <div className={styles.text}>Or</div>
                <div className={styles.line}></div>
            </div>

            <div className={styles.socialSignin}>
                <Link href="/social-signin-fb">
                    <a><img className={styles.iconFacebook} src="/assets/facebook.svg" alt=""/></a>
                </Link>
                <Link href="/social-signin-g">
                    <a><img className={styles.iconGoogle} src="/assets/google.svg" alt=""/></a>
                </Link>
            </div>

            <div>
                <Link href="/sign-up"><a className={styles.signUp}>Don’t have an Account? Sign Up</a></Link>
            </div>
        </div>
    )
}
export default Login;
