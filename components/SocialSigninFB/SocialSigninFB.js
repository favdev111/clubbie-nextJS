import React from "react";
// import styles from './socialSigninFB.module.scss'
// import styles from './socialSigninFB.module.css'
import TemplateInput from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Link from "next/link";

const SocialSigninFB = () => {
    return(
        <div className="social_sign-block">

            <img className="signin-facebook" src={require('../../public/assets/facebook.svg')} alt=""/>
            <h1 className="title">Sign up via Facebook</h1>

            <form action="#" className="signup-form">
                <TemplateInput type="text" placeholder="Enter Email or UserID" />
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

export default SocialSigninFB;
