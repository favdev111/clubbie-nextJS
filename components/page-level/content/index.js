import React from "react";
import ContentAdd from "./add";
import styles from "./content.module.css";

function ProfileSelf({ profile, addMode, posts, clubs }) {
  return (
    <div className={styles.content}>
      <h1 className={styles.contentTitle}>{addMode && "Add "}Content</h1>
      <div className={styles.contentBody}>{addMode && <ContentAdd />}</div>
    </div>
  );
}

export default ProfileSelf;
