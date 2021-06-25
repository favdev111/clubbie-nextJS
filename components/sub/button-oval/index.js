import React from "react";
import cn from "classnames";
import styles from "./ovalbutton.module.css";
import Send from "@svg/send";
import EditProfile from "@svg/edit-profile";
import Uploaded from "@svg/uploaded";
import Tag from "@svg/tag";
import Repost from "@svg/repost";

function OvalButton({
  children,
  appearence,
  status,
  isPublic,
  theme,
  classes,
  onClick,
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
      onClick={onClick}
    >
      {appearence === "edit" && <a>{isPublic ? <Send /> : <EditProfile />}</a>}

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
    </button>
  );
}

export default OvalButton;
