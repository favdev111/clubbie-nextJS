import React from "react";
import cn from "classnames";
import styles from "./forwardbutton.module.css";

function ForwardButton({ children, appearence }) {
  return (
    <button
      className={cn(styles.forwardButton, appearence === "bank" && styles.bank)}
    >
      {children}
      {appearence !== "bank" && <img src="/assets/forward.svg" />}
    </button>
  );
}

export default ForwardButton;
