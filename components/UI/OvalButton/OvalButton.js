import React from "react";

function OvalButton({ children, appearence }) {
  return (
    <button className="oval__button">
     {appearence === "edit" && <img src={require("../../../public/assets/edit.svg")} />} 
     {appearence === "uploaded" && <img src={require("../../../public/assets/upload.svg")} />}
     {appearence === "tagged" && <img src={require("../../../public/assets/tag.svg")} />} 
     {appearence === "reposts" && <img src={require("../../../public/assets/repost.svg")} />} 

 

      {children}
    </button>
  );
}

export default OvalButton;
