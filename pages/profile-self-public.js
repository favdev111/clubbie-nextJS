import React from "react";
import Header from "@layout/header/";
import ProfileSelf from "@page/profile-self/";

function ProfilePagePublic() {
  return (
    <div className="container">
      <Header />
      <ProfileSelf isPublic />
    </div>
  );
}

export default ProfilePagePublic;
