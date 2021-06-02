import React from "react";
import cn from "classnames";
import styles from "./ovalbutton.module.css";

function OvalButton({
  children,
  appearence,
  status,
  isPublic,
  theme,
  classes,
}) {
  return (
    <button
      className={cn(
        classes,
        styles.ovalButton,
        appearence !== "edit" && "secondary",
        theme === "bank" && styles.buttonBank,
        status | (status === "active") && "active",
        status | (status === "passive") && "passive"
      )}
    >
      {appearence === "edit" && (
        <img src={isPublic ? "/assets/send.png" : "/assets/edit.svg"} />
      )}
      {appearence === "uploaded" && <img src="/assets/upload.svg" />}
      {appearence === "tagged" && <img src="/assets/tag.svg" />}
      {appearence === "reposts" && <img src="/assets/repost.svg" />}
      {children}
    </button>
  );
}

export default OvalButton;
