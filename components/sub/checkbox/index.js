import React from "react";

function CheckBox({ children, value }) {
  return (
    <div className="checkboxContainer">
      <input type="checkbox" value={value} id={value} />
      <label htmlFor={children}>{children}</label>
    </div>
  );
}

export default CheckBox;
