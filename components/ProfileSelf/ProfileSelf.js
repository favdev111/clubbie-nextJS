import React from "react";
import Avatar from "../UI/Avatar/Avatar";

function ProfileSelf() {
  return (
    <div className="profile">
      <h1 className="profile__title"> Profile </h1>
      <div className="profile__player">
        <div className="profile__player__header">
          <Avatar />
        </div>
      </div>
    </div>
  );
}

export default ProfileSelf;
