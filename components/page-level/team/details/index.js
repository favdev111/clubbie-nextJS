import React from "react";
import Button from "@sub/button";
import ActionButton from "@sub/action-button";
import styles from "./teamDetails.module.css";

function TeamHeader({ teamCrest, teamTitle }) {
  return (
    <div className={styles.teamHeaderWrapper}>
      <div className={styles.teamCrestWrapper}>
        <img
          className={styles.teamCrest}
          src={teamCrest || "/assets/club-badge-placeholder.png"}
        />
        <span className={styles.teamClubCrestWrapper}>
          <img
            className={styles.teamClubCrest}
            src={teamCrest || "/assets/club-badge-placeholder.png"}
          />
        </span>
      </div>
      <div className={styles.teamHeaderDetailsWrapper}>
        <div className={styles.teamHeaderTitleWrapper}>
          <h1>{teamTitle}</h1>
          <span className={styles.teamHeaderAdminActionButtons}>
            <ActionButton type="settings" />
            <ActionButton type="edit" />
            <ActionButton type="chat" />
          </span>
        </div>
        <div className={styles.teamHeaderActionButtons}>
          <Button variant="success" size="medium">
            Join
          </Button>
          <Button variant="danger" size="medium">
            Leave
          </Button>
        </div>
      </div>
    </div>
  );
}

function TeamDetails({ team }) {
  return (
    <TeamHeader teamCrest={team?.crest} teamTitle={team?.title}></TeamHeader>
  );
}

export default TeamDetails;
