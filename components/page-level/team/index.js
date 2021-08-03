import React from "react";
import cn from "classnames";
import TeamDetails from "./details";
import TeamEdit from "./edit";
import ContentFeed from "@page/content/feed";
import styles from "./teams.module.css";

function Team({ team, user, editMode, postFeed }) {
  return (
    <>
      <div className={cn(styles.team, !postFeed && styles.teamMarginBottom)}>
        <h1 className={styles.teamTitle}>Team</h1>
        <div className={styles.teamContent}>
          {!editMode && <TeamDetails team={team} user={user} />}
          {editMode && <TeamEdit team={team} user={user} />}
        </div>
      </div>
      {!editMode && postFeed && (
        <div className={styles.teamPostFeed}>
          <ContentFeed
            posts={{
              results: [],
              page: 0,
              limit: 10,
              skip: 0,
              totalPages: 0,
              totalResults: 0,
            }}
            hideFilters={true}
            user={user}
          />
        </div>
      )}
    </>
  );
}

export default Team;
