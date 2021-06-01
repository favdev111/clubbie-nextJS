import React from "react";
import DirectedButton from "@sub/button-directed";
import styles from "./profile-info.module.css";

function ProfileInfo({ footballerName, role, join }) {
  return (
    <div className={styles.profileInfo}>
      <h2 className={styles.playerName}> {footballerName} </h2>
      <h6 className={styles.playerRole}> {role} </h6>
      {join ? (
        <DirectedButton appearence="join" direction="forward">
          Join a club
        </DirectedButton>
      ) : (
        <div>
          <img className={styles.playerClubImg} src="/assets/team2.png" />
          <img className={styles.playerClubImg} src="/assets/team1.png" />
        </div>
      )}
    </div>
  );
}

export default ProfileInfo;
