import React from "react";
import cn from "classnames";
import styles from "./directedbutton.module.css";
import RightArrow from "@svg/right-arrow";
import LeftArrow from "@svg/left-arrow";

function DirectedButton({ children, appearence, direction, onClick }) {
  return (
    <button
      className={cn(
        styles.directedButton,
        appearence === "bank" && styles.bank
      )}
      onClick={onClick}
    >
      {direction === "backward" && (
        <a>
          <LeftArrow />
        </a>
      )}
      {children}
      {direction === "forward" && (
        <a>
          <RightArrow />
        </a>
      )}
    </button>
  );
}

export default DirectedButton;
