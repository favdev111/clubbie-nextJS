import React from "react";
import Header from "@c/Header/index";
import ProfileSelf from "@c/ProfileSelf/index";

function ProfilePageNoclub() {
  return (
    <div className="container">
      <Header />
      <ProfileSelf join />
    </div>
  );
}

export default ProfilePageNoclub;
