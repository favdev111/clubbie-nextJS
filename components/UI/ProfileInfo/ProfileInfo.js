import React from "react";

function ProfileInfo({ footballerName, role}) {

  return (
    <div className="profile__info">
      <h2> {footballerName} </h2>
      <h6> {role} </h6>
      <img src={require(`../../../public/assets/team2.png`)} />
      <img src={require(`../../../public/assets/team1.png`)} />
    </div>
  );
}

export default ProfileInfo;
