import React from "react";
import Header from "@layout/header/";
import ProfileSelf from "@page/profile-self/";

function ProfilePageNoclub() {
  return (
    <div className="container">
      <Header />
      <ProfileSelf join />
    </div>
  );
}

export default ProfilePageNoclub;
