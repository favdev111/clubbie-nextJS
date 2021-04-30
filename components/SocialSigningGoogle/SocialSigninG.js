import React from "react";
// import styles from './socialSigninG.module.scss'
// import styles from './socialSigninG.module.css'
import TemplateInput from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Link from "next/link";

const SocialSigninG = () => {
    return(
        <div className="social_sign-block">

            <img className="signin-google" src={require('../../public/assets/google.svg')} alt=""/>
            <h1 className="title">Sign up via Google</h1>

            <form action="#" className="signup-form">
                <TemplateInput type="text" placeholder="Enter Google Email" />
                <TemplateInput type="password" placeholder="Password" />
            </form>

            <div className="form-act">
                <Button>
                    Sign Up
                </Button>
            </div>

            <div>
                <Link href="/login"><a className="to-login">Go back to Login</a></Link>
            </div>
        </div>
    )
};

export default SocialSigninG;
