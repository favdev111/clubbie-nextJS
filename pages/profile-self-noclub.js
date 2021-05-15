import React from "react";
import Header from "@c/Header/";
import ProfileSelf from "@c/ProfileSelf/";

function ProfilePageNoclub() {
  return (
    <div className="container">
      <Header />
      <ProfileSelf join />
    </div>
  );
}

export default ProfilePageNoclub;
