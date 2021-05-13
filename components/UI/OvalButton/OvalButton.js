import React from "react";
import cn from "classnames";
import styles from "./ovalbutton.module.scss"

function OvalButton({ children, appearence, status, isPublic, theme }) {
  return (
    <button
      className={cn(
        styles.ovalButton,
        appearence !== "edit" && "secondary",
        theme === "bank" && styles.buttonBank,
        status === "active" && "active",
        status !== "active" && "passive"
      )}
    >
      {appearence === "edit" && (
        <img
          src={
            isPublic
              ? "/assets/send.png"
              : "/assets/edit.svg"
          }
        />
      )}
      {appearence === "uploaded" && (
        <img src="/assets/upload.svg" />
      )}
      {appearence === "tagged" && (
        <img src="/assets/tag.svg" />
      )}
      {appearence === "reposts" && (
        <img src="/assets/repost.svg" />
      )}
      {children}
    </button>
  );
}

export default OvalButton;
