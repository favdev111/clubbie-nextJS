import React from "react";
import Header from "@layout/header/";
import ProfileSelf from "@page/profile-self/";

function ProfilePage() {
  return (
    <div className="container">
      <Header />
      <ProfileSelf />
    </div>
  );
}

export default ProfilePage;
