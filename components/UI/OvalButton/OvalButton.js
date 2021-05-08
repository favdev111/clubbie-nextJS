import React from "react";

function OvalButton({ children, src }) {
  return (
    <button className="profile-self__button">
      <img src={require(`${src}`)} />
      {children}
    </button>
  );
}

export default OvalButton;
