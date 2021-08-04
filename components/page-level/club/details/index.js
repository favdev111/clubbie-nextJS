import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@sub/button";
import ActionButton from "@sub/action-button";
import useNotification from "@sub/hook-notification";
import styles from "./clubDetails.module.css";

function ClubHeader({
  clubId,
  clubCrest,
  clubName,
  showNotificationMsg,
  joinButton,
  leaveButton,
  isOwner,
  isOfficial,
}) {
  return (
    <>
      <div className={styles.clubHeaderWrapper}>
        <div>
          <div className={styles.clubCrestWrapper}>
            <img
              className={styles.clubCrest}
              src={clubCrest || "/assets/club-badge-placeholder.png"}
            />
          </div>
        </div>
        <div className={styles.clubHeaderDetailsWrapper}>
          <div className={styles.clubHeaderTitleWrapper}>
            <h1>{clubName}</h1>
            <span className={styles.clubHeaderAdminActionButtons}>
              {isOwner && (
                <Link href={`/clubs/${clubId}/edit`}>
                  <a>
                    <ActionButton type="edit" />
                  </a>
                </Link>
              )}
            </span>
          </div>
          <div className={styles.clubHeaderActionButtons}>
            {joinButton && (
              <Button variant="success" size="medium">
                {isOwner || isOfficial ? "Join as Player" : "Join"}
              </Button>
            )}
            {leaveButton && (
              <Button variant="danger" size="medium">
                {isOwner || isOfficial ? "Leave as Player" : "Leave"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ClubDetails({ user, club }) {
  const { showNotificationMsg } = useNotification();

  const [_club] = useState(club);
  const [_isOwner, setIsOwner] = useState(false);
  const [_isOfficial, setIsOfficial] = useState(false);
  const [_isPlayer, setIsPlayer] = useState(false);

  useEffect(() => {
    const { owner, officials, players } = _club;

    // set user authority
    if (owner?.id === user?.id) {
      setIsOwner(true);
    }
    const foundOfficial = officials?.find((x) => x?.user?.id === user?.id);
    if (foundOfficial) {
      setIsOfficial(true);
    }
    const foundPlayer = players?.find((x) => x?.id === user?.id);
    if (foundPlayer) {
      setIsPlayer(true);
    }
  }, [_club]);

  return (
    <>
      <ClubHeader
        clubId={_club?.id}
        clubCrest={_club?.crest}
        clubName={_club?.title}
        showNotificationMsg={showNotificationMsg}
        joinButton={!_isPlayer}
        leaveButton={_isPlayer}
        isOwner={_isOwner}
        isOfficial={_isOfficial}
      ></ClubHeader>
    </>
  );
}

export default ClubDetails;
