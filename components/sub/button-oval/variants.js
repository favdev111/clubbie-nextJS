import React from "react";
import OvalButton from "./OvalButton";

function Variants() {
  return (
    <div className="container">
      <OvalButton isPublic appearence="edit">
        Edit Profile
      </OvalButton>
      <OvalButton appearence="edit">Edit Profile</OvalButton>
      <OvalButton status="active" appearence="uploaded">
        Uploaded
      </OvalButton>
      <OvalButton appearence="tagged">Tagged</OvalButton>
      <OvalButton appearence="reposts">Reposts</OvalButton>
      <OvalButton theme="bank">Add New</OvalButton>
    </div>
  );
}

export default Variants;
