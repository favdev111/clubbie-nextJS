import React from "react";
import TemplateInput from "../UI/Input";
import Button from "../UI/Button";
import Link from "next/link";
import styles from './socialSigninG.module.scss'

const SocialSigninG = () => {
    return(
        <div className={styles.socSignBlock}>

            <img className={styles.iconGoogle} src="/assets/google.svg" alt=""/>
            <h1 className={styles.title}>Sign up via Google</h1>

            <form action="#" className={styles.formLogin}>
                <TemplateInput type="text" placeholder="Enter Google Email" />
                <TemplateInput type="password" placeholder="Password" />
            </form>

            <div className={styles.formAct}>
                <Button>
                    Sign Up
                </Button>
            </div>

            <div>
                <Link href="/login"><a className={styles.toLogin}>Go back to Login</a></Link>
            </div>
        </div>
    )
};

export default SocialSigninG;
