import React from "react";
import Header from "../components/Header/Header";
import ProfileSelf from "../components/ProfileSelf/ProfileSelf";

function ProfilePagePublic() {
  return (
    <div className="container">
      <Header />
      <ProfileSelf isPublic />
    </div>
  );
}

export default ProfilePagePublic;
