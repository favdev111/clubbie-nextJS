import React from "react";
import Header from "@c/Header/";
import ProfileSelf from "@c/ProfileSelf/";

function ProfilePagePublic() {
  return (
    <div className="container">
      <Header />
      <ProfileSelf isPublic />
    </div>
  );
}

export default ProfilePagePublic;
