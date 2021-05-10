import React from "react";
import cn from "classnames";

function ForwardButton({ children, appearence }) {
  return (
    <button className={cn("forward-button", appearence === "bank" && "bank")}>
      {children}
      {appearence !== "bank" && (
        <img src={require("../../../public/assets/forward.svg")} />
      )}
    </button>
  );
}

export default ForwardButton;
