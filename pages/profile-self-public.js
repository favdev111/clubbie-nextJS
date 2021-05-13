import React from "react";
import Header from "../components/Header/index";
import ProfileSelf from "../components/ProfileSelf/index";

function ProfilePagePublic() {
  return (
    <div className="container">
      <Header />
      <ProfileSelf isPublic />
    </div>
  );
}

export default ProfilePagePublic;
