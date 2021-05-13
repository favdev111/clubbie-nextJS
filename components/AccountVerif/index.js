import React from "react";
import Button from "../UI/Button";
import TemplateInput from "../UI/Input";
import styles from "./accountVerif.module.scss";

const AccountVerif = () => {
    return(
        <div className={styles.verifBlock}>
            <h1 className={styles.title}>Account Verification</h1>

            <div className={styles.textBlock}>
                <p className={styles.text}>Please enter your mobile phone number below,
                so we can send you a verification code.</p>
                <p className={styles.text}>Verification only takes a few minutes, helps secure your account.</p>
            </div>

            <form action="#" className={styles.formVerif} >
                <TemplateInput type="tel" placeholder="Enter your phone number"/>
            </form>


            <div className={styles.btnVerif}>
                <Button width="142px" height="52px">
                    Verify
                </Button>
            </div>

        </div>
    )
};

export default AccountVerif;
