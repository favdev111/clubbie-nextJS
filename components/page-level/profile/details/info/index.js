import React from "react";
import Link from "next/link";
import DirectedButton from "@sub/button-directed";
import Avatar from "@sub/avatar";
import ToolTip from "@sub/tooltip";
import styles from "./profile-info.module.css";

function ProfileInfo({ footballerName, playerTitle, isPublic, image, clubs }) {
  return (
    <>
      <Avatar
        src={image || "/assets/person-placeholder.jpg"}
        className={styles.profilePlayerImage}
      />
      <div className={styles.profileInfo}>
        <h2 className={styles.playerName}> {footballerName} </h2>
        <h6 className={styles.playerRole}> {playerTitle} </h6>
        {clubs.length > 0 && (
          <div className={styles.clubsCrest}>
            {clubs.map((club, index) => (
              <ToolTip text={club.title}>
                <span>
                  <Link href={`/clubs/${club?.id}`}>
                    <a>
                      <img
                        key={index}
                        className={styles.playerClubImg}
                        src={
                          club?.crest || "/assets/club-badge-placeholder.png"
                        }
                      />
                    </a>
                  </Link>
                </span>
              </ToolTip>
            ))}
          </div>
        )}
        {!isPublic && (
          <Link href="/teamhub/join-club">
            <a>
              <DirectedButton direction="forward">
                <span className={styles.btnChipPadding}>Join Club</span>
              </DirectedButton>
            </a>
          </Link>
        )}
      </div>
    </>
  );
}

export default ProfileInfo;
