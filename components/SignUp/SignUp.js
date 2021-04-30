import React from "react";
import TemplateInput from "../UI/Input/Input";
import Button from "../UI/Button/Button";
// import styles from "./signup.module.scss";
// import styles from "./signup.module.css";
import Link from "next/link";

const SignUp = () => {
    return(
        <div className="signup-block">
            <h1 className="title">Sign Up</h1>

            <form action="#" className="form-signup">
                <TemplateInput type="text" placeholder="Your Email Address" />
                <TemplateInput type="password" placeholder="Choose a password" />
                <TemplateInput type="password" placeholder="Repeat password" />
            </form>
            <div className="form-act">
                <Button>
                    Sign Up
                </Button>
            </div>

            <div className="devide_block">
                <div className="devide_line"></div>
                <div className="devide_text">Or</div>
                <div className="devide_line"></div>
            </div>

            <div className="social-signin">
                <Link href="/social-signin-fb">
                    <a><img className="signin-facebook" src={require('../../public/assets/facebook.svg')} alt=""/></a>
                </Link>
                <Link href="/social-signin-g">
                    <a><img className="signin-google" src={require('../../public/assets/google.svg')} alt=""/></a>
                </Link>
            </div>

            <div>
                <Link href="/login"><a className="to-login">Go to Login</a></Link>
            </div>

        </div>
    )
}
export default SignUp
