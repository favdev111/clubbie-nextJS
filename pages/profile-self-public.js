import React from "react";
import Header from "@c/Header/index";
import ProfileSelf from "@c/ProfileSelf/index";

function ProfilePagePublic() {
  return (
    <div className="container">
      <Header />
      <ProfileSelf isPublic />
    </div>
  );
}

export default ProfilePagePublic;
