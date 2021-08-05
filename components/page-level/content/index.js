import React from "react";
import ContentAdd from "./add";
import ContentEdit from "./edit";
import ContentDetails from "./details";
import styles from "./content.module.css";

function Content({ mode, content, user, team }) {
  return (
    <div className={styles.content}>
      <h1 className={styles.contentTitle}>
        {mode
          ? (mode === "add" && "Add Content") ||
            (mode === "edit" && "Edit Content")
          : "Content Details"}
      </h1>
      <div className={styles.contentBody}>
        {mode
          ? (mode === "add" && <ContentAdd user={user} team={team} />) ||
            (mode === "edit" && <ContentEdit content={content} team={team} />)
          : content && (
              <ContentDetails content={content} user={user} team={team} />
            )}
      </div>
    </div>
  );
}

export default Content;
