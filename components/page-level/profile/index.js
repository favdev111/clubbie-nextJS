import React from "react";
import ProfileEdit from "./edit";
import ProfileDetails from "./details";
import styles from "./profileself.module.css";
import ProfilePosts from "./posts/index";
import Link from "next/link";

function ProfileSelf({ isPublic, profileInfo, editMode, posts, clubs }) {
  return (
    <>
      <div className={styles.profile}>
        <h1 className={styles.profileTitle}>{editMode && "Edit "}Profile</h1>
        <div className={styles.profilePlayer}>
          {editMode && !isPublic ? (
            <ProfileEdit
              profile={{
                ...profileInfo?.profile,
              }}
              clubs={clubs}
            />
          ) : (
            <ProfileDetails
              profileInfo={profileInfo}
              isPublic={isPublic}
              clubs={clubs}
            />
          )}
        </div>
        {!editMode && <ProfilePosts userId={profileInfo?.id} posts={posts} />}


      </div>
      <div className={styles.footer}>
        <Link href="/privacy-policy">Privacy Policy </Link><Link href="/terms-of-use">Terms of Use</Link><Link href="/faqs">FAQs</Link>
      </div>
    </>
  );
}

export default ProfileSelf;
