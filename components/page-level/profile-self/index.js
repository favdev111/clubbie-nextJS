import React from "react";
import Avatar from "@sub/avatar";
import OvalButton from "@sub/button-oval";
import ForwardButton from "@sub/button-forward";
import Link from "next/link";
import ProfileInfo from "./info";
import ProfileDetails from "./details";

import styles from "./profileself.module.css";

function ProfileSelf({ join, isPublic, person }) {
  // Fake data

  return (
    <div className={styles.profile}>
      <h1 className={styles.profileTitle}> Profile </h1>
      <div className={styles.profilePlayer}>
        <div className={styles.profilePlayerHeader}>
          <div className={styles.profilePlayerHeaderInnerLeft}>
            <Avatar />
            <ProfileInfo
              join={join}
              footballerName={person.name}
              role={person.role}
            />
          </div>
          <div className={styles.profilePlayerHeaderInnerRight}>
            <OvalButton isPublic={isPublic} appearence="edit">
              Edit Profile
            </OvalButton>
          </div>
        </div>
        <div className={styles.profilePlayerBody}>
          <ProfileDetails data={person} isPublic={isPublic} />
          <Link href="/connected-banks">
            <a>
              <ForwardButton> Connected Bank Accounts </ForwardButton>
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.profileButtons}>
        <OvalButton status="active" appearence="uploaded">
          Uploaded
        </OvalButton>
        <OvalButton status="passive" appearence="tagged">
          Tagged
        </OvalButton>
        <OvalButton status="passive" appearence="reposts">
          Reposts
        </OvalButton>
      </div>
      <div className={styles.profilePhotos}>
        <div className={styles.profilePhotosItem}>
          <img src="/assets/photo1.png"></img>
          <div className={styles.profilePhotosOptions}>
            <img src="/assets/edit-photo.svg" />
            <img src="/assets/thrash.svg" />
          </div>
        </div>
        <div className={styles.profilePhotosItem}>
          <img src="assets/photo2.png" />
          <div className={styles.profilePhotosOptions}>
            <img src="assets/edit-photo.svg" />
            <img src="/assets/thrash.svg" />
          </div>
        </div>
        <div className={styles.profilePhotosItem}>
          <img src="/assets/photo3.png" />
          <div className={styles.profilePhotosOptions}>
            <img src="/assets/edit-photo.svg" />
            <img src="/assets/thrash.svg" />
          </div>
        </div>
        <div className={styles.profilePhotosItem}>
          <img src="/assets/photo2.png" />
          <div className={styles.profilePhotosOptions}>
            <img src="/assets/edit-photo.svg" />
            <img src="/assets/thrash.svg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSelf;
