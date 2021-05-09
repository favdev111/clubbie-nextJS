import React from "react";
import cn from "classnames";

function OvalButton({ children, appearence, status, isPublic, theme }) {
  return (
    <button
      className={cn(
        "oval__button",
        appearence !== "edit" && "secondary",
        theme === "bank" && "button-bank",
        status === "active" && "active",
        status !== "active" && "passive"
      )}
    >
      {appearence === "edit" && (
        <img
          src={
            isPublic
              ? require("../../../public/assets/send.png")
              : require("../../../public/assets/edit.svg")
          }
        />
      )}

      {appearence === "uploaded" && (
        <img src={require("../../../public/assets/upload.svg")} />
      )}
      {appearence === "tagged" && (
        <img src={require("../../../public/assets/tag.svg")} />
      )}
      {appearence === "reposts" && (
        <img src={require("../../../public/assets/repost.svg")} />
      )}
      {children}
    </button>
  );
}

export default OvalButton;
