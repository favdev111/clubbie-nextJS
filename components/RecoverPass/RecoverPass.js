import React from "react";
// import styles from "../RecoverPass/recoverPass.module.scss";
// import styles from "../RecoverPass/recoverPass.module.css";
import TemplateInput from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Link from "next/link";


const RecoverPass = () => {
    return(
        <div className="recovery_block">
            <h1 className="title">Forgot Password</h1>

            <div className="text-block">
                <p className="text">Enter your email address and we will send you
                    instructions on how to recover your account</p>
            </div>
            <form action="#" className="recovery-form" >
                <TemplateInput type="email" placeholder="Your Email Address"/>
            </form>


            <div className="form-act">
                <Button>
                    Submit
                </Button>
            </div>

            <div>
                <Link href="/login"><a className="to-login">Go back to Login</a></Link>
            </div>

        </div>

    )
};

export default RecoverPass;
