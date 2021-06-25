import React from "react";
import ProfileEdit from "./edit";
import ProfileDetails from "./details";
import styles from "./profileself.module.css";
import ProfilePosts from "./posts/index";

function ProfileSelf({ isPublic, profile, editMode, posts }) {
  return (
    <div className={styles.profile}>
      <h1 className={styles.profileTitle}>{editMode && "Edit "}Profile</h1>
      <div className={styles.profilePlayer}>
        {editMode && !isPublic ? (
          <ProfileEdit profile={profile} />
        ) : (
          <ProfileDetails profile={profile} isPublic={isPublic} />
        )}
      </div>
      {!editMode && <ProfilePosts posts={posts} />}
    </div>
  );
}

export default ProfileSelf;
