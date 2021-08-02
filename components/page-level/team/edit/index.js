import React, { useState } from "react";
import Link from "next/link";
import Button from "@sub/button";
import TemplateInput from "@sub/input";
import useNotification from "@sub/hook-notification";
import styles from "./teamDetails.module.css";

function TeamHeader({
  clubId,
  clubCrest,
  clubName,
  teamId,
  teamCrest,
  teamTitle,
  showNotificationMsg,
}) {
  return (
    <>
      <div className={styles.teamHeaderWrapper}>
        <div>
          <div className={styles.teamCrestWrapper}>
            <img
              className={styles.teamCrest}
              src={teamCrest || "/assets/club-badge-placeholder.png"}
            />
          </div>
        </div>
        <div className={styles.teamHeaderDetailsWrapper}>
          <div className={styles.teamHeaderTitleWrapper}>
            <TemplateInput value={teamTitle} size="large"></TemplateInput>
          </div>
          <div className={styles.teamHeaderActionButtons}>
            <Button variant="transparent" size="medium">
              Cancel
            </Button>
            <Button variant="info" size="medium">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function TeamDetails({ user, team }) {
  const { showNotificationMsg } = useNotification();

  const [_team, setTeam] = useState(team);

  return (
    <TeamHeader
      clubId={_team?.club?.id}
      clubCrest={_team?.club?.crest}
      clubName={_team?.club?.title}
      teamId={_team?.id}
      teamCrest={_team?.crest}
      teamTitle={_team?.title}
      showNotificationMsg={showNotificationMsg}
    ></TeamHeader>
  );
}

export default TeamDetails;
