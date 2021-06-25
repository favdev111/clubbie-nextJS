import React from "react";
import ProfileEdit from "./edit";
import ProfileDetails from "./details";
import styles from "./profileself.module.css";
import ProfilePosts from "./posts/index";

function ProfileSelf({ isPublic, profile, editMode, posts, clubs }) {
  return (
    <div className={styles.profile}>
      <h1 className={styles.profileTitle}>{editMode && "Edit "}Profile</h1>
      <div className={styles.profilePlayer}>
        {editMode && !isPublic ? (
          <ProfileEdit profile={profile} clubs={clubs} />
        ) : (
          <ProfileDetails profile={profile} isPublic={isPublic} clubs={clubs} />
        )}
      </div>
      {!editMode && <ProfilePosts posts={posts} />}
    </div>
  );
}

export default ProfileSelf;
