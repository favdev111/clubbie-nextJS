import React from "react";

function ProfileInfo({ footballerName, teams }) {
  return (
    <div className="profile__info">
      <h2> {footballerName} </h2>
      <h6> Footboller </h6>
      {teams && teams.map((team) => <img src={require(`${team}`)} />)}
      {/*       <img src={require("../../../public/assets/team2.png")} />
      <img src={require("../../../public/assets/team1.png")} /> */}
    </div>
  );
}

export default ProfileInfo;
