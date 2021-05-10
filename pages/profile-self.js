import React from "react";
import Header from "../components/Header/Header";
import ProfileSelf from "../components/ProfileSelf/ProfileSelf";

function ProfilePage() {
  return (
    <div className="container">
      <Header />
      <ProfileSelf />
    </div>
  );
}

export default ProfilePage;
