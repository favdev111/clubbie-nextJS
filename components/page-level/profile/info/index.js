import React from "react";
import Link from "next/link";
import DirectedButton from "@sub/button-directed";
import styles from "./profile-info.module.css";
import Avatar from "@sub/avatar";

function ProfileInfo({ footballerName, playerTitle, isPublic, image }) {
  return (
    <>
      <Avatar
        src={image || "/assets/person-placeholder.jpg"}
        className={styles.profilePlayerImage}
      />
      <div className={styles.profileInfo}>
        <h2 className={styles.playerName}> {footballerName} </h2>
        <h6 className={styles.playerRole}> {playerTitle} </h6>
        {!isPublic && (
          <>
            <div>
              <img className={styles.playerClubImg} src="/assets/team2.png" />
              <img className={styles.playerClubImg} src="/assets/team1.png" />
              <Link href="/teamhub/join-club">
                <a>
                  <DirectedButton direction="forward">
                    <span className={styles.btnChipPadding}>Join Club</span>
                  </DirectedButton>
                </a>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileInfo;
