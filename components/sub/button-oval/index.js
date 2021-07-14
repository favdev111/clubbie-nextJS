import React from "react";
import cn from "classnames";
import styles from "./ovalbutton.module.css";
import Send from "@svg/send";
import EditProfile from "@svg/edit-profile";
import Uploaded from "@svg/uploaded";
import Tag from "@svg/tag";
import Repost from "@svg/repost";
import Messages from "@svg/messages";

function OvalButton({
  children,
  appearence,
  status,
  isPublic,
  theme,
  classes,
  onClick,
  loading,
}) {
  return (
    <button
      className={cn(
        classes,
        styles.ovalButton,
        loading && styles.btnDisabled,
        appearence !== "edit" && "secondary",
        theme === "bank" && styles.buttonBank,
        status | (status === "active") && "active",
        status | (status === "passive") && "passive"
      )}
      onClick={onClick}
    >
      <div className={styles.btnContent}>
        {loading && <div className={styles.loading}></div>}
        <span className={styles.contTxt}>
          {appearence === "edit" && (
            <a>{isPublic ? <Send /> : <EditProfile />}</a>
          )}
          {appearence === "message" && (
            <a>
              <Messages />
            </a>
          )}

          {appearence === "uploaded" && (
            <a>
              <Uploaded />
            </a>
          )}
          {appearence === "tagged" && (
            <a>
              <Tag />
            </a>
          )}
          {appearence === "reposts" && (
            <a>
              <Repost />
            </a>
          )}
          {children}
        </span>
      </div>
    </button>
  );
}

export default OvalButton;
