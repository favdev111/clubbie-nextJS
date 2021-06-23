import React from "react";
import styles from "./index.module.css";
import cn from "classnames";
import Button from "@sub/button";

function YouShouldSignUp({ open }) {
  /* _app.js better for popups 
    method: send setPopupOpen state with props */
  return (
    <div className={cn(open ? styles.popup : styles.close)}>
      <div className={styles.content}>
        <p> Does it seem fun? You need to login or sign up to interact</p>
        <span className={styles.closePopup}>X</span>
        <div className={styles.buttons}>
          <Button> Login</Button>
          <Button> Sign Up</Button>
        </div>
      </div>
    </div>
  );
}

export default YouShouldSignUp;
