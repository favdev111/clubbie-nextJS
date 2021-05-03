import React from "react";
// import styles from "./accountVerif.module.scss";
// import styles from "./accountVerif.module.css";
import Button from "../UI/Button/Button";
import TemplateInput from "../UI/Input/Input";

const AccountVerif = () => {
    return(
        <div className="verif_block">
            <h1 className="title">Account Verification</h1>

            <div className="text_block">
                <p className="text">Please enter your mobile phone number below,
                so we can send you a verification code.</p>
                <p className="text">Verification only takes a few minutes, helps secure your account.</p>
            </div>

            <form action="#" className="verif_form" >
                <TemplateInput type="tel" placeholder="Enter your phone number"/>
            </form>


            <div className="verif_btn">
                <Button width="142px" height="52px">
                    Verify
                </Button>
            </div>

        </div>
    )
};

export default AccountVerif;
