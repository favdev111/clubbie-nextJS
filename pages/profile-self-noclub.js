import React from "react";
import Header from "../components/Header/index";
import ProfileSelf from "../components/ProfileSelf/index";

function ProfilePageNoclub() {
  return (
    <div className="container">
      <Header />
      <ProfileSelf join />
    </div>
  );
}

export default ProfilePageNoclub;
