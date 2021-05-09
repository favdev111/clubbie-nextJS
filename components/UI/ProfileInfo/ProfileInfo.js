import React from "react";
import ForwardButton from "../ForwardButton/ForwardButton";

function ProfileInfo({ footballerName, role, join }) {
  return (
    <div className="profile__info">
      <h2> {footballerName} </h2>
      <h6> {role} </h6>
      {join ? (
        <ForwardButton appearence="join"> Join a club </ForwardButton>
      ) : (
        <div>
          <img src={require(`../../../public/assets/team2.png`)} />
          <img src={require(`../../../public/assets/team1.png`)} />
        </div>
      )}
    </div>
  );
}

export default ProfileInfo;
