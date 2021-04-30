import React from "react";
// import styles from "./accountConfirm.module.scss";
// import styles from "./accountConfirm.module.css";
import Button from "../UI/Button/Button";

const AccountConfirm = () => {
    return(
        <div className="confirm_block">
            <h1 className="title">Confirm your account</h1>

            <div className="text_block">
                <p className="text">Please verify your email address so
                 you can sign in if you ever forget your password. We've sent a confirmation email
                    to <span className="conf_email">example@email.com</span></p>
                <br/>
                <br/>
                <p className="text">If you still don't see it, you can resend the confirmation email</p>
            </div>

            <div className="btn_confirm">
                <Button>
                    Resend
                </Button>
            </div>

        </div>
    )
};

export default AccountConfirm;
