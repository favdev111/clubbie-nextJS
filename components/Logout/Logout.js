import React from "react";
// import styles from "./logout.module.scss";
// import styles from "./logout.module.css";
import Button from "../UI/Button/Button";
import Link from "next/link";

const Logout = () => {
    return(
        <div className="logout_block">
            <h1 className="title">Logged Out</h1>

            <div className="text_block">
                <p className="text_content">Thank you for using Clubbie</p>
            </div>

            <div className="login_btn">
                <Button>
                    Login
                </Button>
            </div>

            <div className="devide-block">
                <div className="devide-line"></div>
                <div className="devide-text">Or</div>
                <div className="devide-line"></div>
            </div>

            <div className="social-signin">
                <Link href="/social-signin-fb">
                    <a><img className="signin-facebook" src={require('../../public/assets/facebook.svg')} alt=""/></a>
                </Link>
                <Link href="/social-signin-g">
                    <a><img className="signin-google" src={require('../../public/assets/google.svg')} alt=""/></a>
                </Link>
            </div>

        </div>
    )
};

export default Logout;
