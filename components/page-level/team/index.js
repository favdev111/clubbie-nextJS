import React from "react";
import cn from "classnames";
import TeamDetails from "./details";
import TeamEdit from "./edit";
import ContentFeed from "@page/content/feed";
import styles from "./teams.module.css";

function Team({ team, user, editMode, postFeed, posts }) {
  return (
    <>
      <div className={cn(styles.team, !postFeed && styles.teamMarginBottom)}>
        <h1 className={styles.teamTitle}>Team</h1>
        <div className={styles.teamContent}>
          {!editMode && <TeamDetails team={team} user={user} />}
          {editMode && <TeamEdit team={team} user={user} />}
        </div>
      </div>
      {!editMode && postFeed && posts && (
        <div className={styles.teamPostFeed}>
          <ContentFeed
            posts={posts}
            hideFilters={true}
            user={user}
            team={team}
            hideCreateContent={
              team?.owner?.id !== user?.id || team?.leader?.id !== user?.id
            }
          />
        </div>
      )}
    </>
  );
}

export default Team;
