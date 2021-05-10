import React from "react";

function Avatar({ src }) {
  return (
    <>
      <img
        className="profile__player__header__avatar"
        src={require("../../../public/assets/profile-avatar.png")}
      />
    </>
  );
}

export default Avatar;
