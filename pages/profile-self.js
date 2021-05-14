import React from "react";
import Header from "@c/Header/index";
import ProfileSelf from "@c/ProfileSelf/index";

function ProfilePage() {
  return (
    <div className="container">
      <Header />
      <ProfileSelf />
    </div>
  );
}

export default ProfilePage;
