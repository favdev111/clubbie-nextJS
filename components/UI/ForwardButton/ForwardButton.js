import React from "react";

function ForwardButton({ children }) {
  return (
    <button>
      {children}
      <img src={require("../../../public/assets/forward.svg")} />
    </button>
  );
}

export default ForwardButton;
