import React from "react";
import cn from "classnames";
import styles from "./directedbutton.module.css";

function DirectedButton({ children, appearence, direction }) {
  return (
    <button
      className={cn(
        styles.directedButton,
        appearence === "bank" && styles.bank
      )}
    >
      {direction === "backward" && <img src="/assets/back.svg" />}
      {children}
      {direction === "forward" && <img src="/assets/forward.svg" />}
    </button>
  );
}

export default DirectedButton;
