import React from "react";
import ForwardButton from "@sub/button-forward";
import styles from "./profile-info.module.css";

function ProfileInfo({ footballerName, role, join }) {
  return (
    <div className={styles.profileInfo}>
      <h2> {footballerName} </h2>
      <h6> {role} </h6>
      {join ? (
        <ForwardButton appearence="join"> Join a club </ForwardButton>
      ) : (
        <div>
          <img src="/assets/team2.png" />
          <img src="/assets/team1.png" />
        </div>
      )}
    </div>
  );
}

export default ProfileInfo;
