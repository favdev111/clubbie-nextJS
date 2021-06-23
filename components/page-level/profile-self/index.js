import React from "react";
import Avatar from "@sub/avatar";
import OvalButton from "@sub/button-oval";
import DirectedButton from "@sub/button-directed";
import Button from "@sub/button";
import Link from "next/link";
import ProfileInfo from "./info";
import ProfileEdit from "./edit";
import ProfileDetails from "./details";
import styles from "./profileself.module.css";

import EditPhoto from "@svg/edit-photo";
import Thrash from "@svg/thrash";
import EditProfile from "@svg/edit-profile";

function ProfileSelf({ join, isPublic, person, editMode }) {
  return (
    <div className={styles.profile}>
      <h1 className={styles.profileTitle}>{editMode && "Edit "}Profile</h1>
      <div className={styles.profilePlayer}>
        <div className={styles.profilePlayerHeader}>
          <div className={styles.profilePlayerHeaderInnerLeft}>
            <Avatar
              src={person.image}
              editMode={editMode}
              className={styles.profilePlayerImage}
            />
            {!editMode && (
              <ProfileInfo
                join={join}
                footballerName={person.name}
                role={person.role}
              />
            )}
          </div>
          <div className={styles.profilePlayerHeaderInnerRight}>
            {editMode ? (
              <div>
                <Button>Save Changes</Button>
              </div>
            ) : (
              <>
                {!isPublic && (
                  <a className={styles.profileEditIcon}>
                    <EditProfile />
                  </a>
                )}
                <OvalButton
                  isPublic={isPublic}
                  appearence="edit"
                  classes={styles.profileEditButton}
                >
                  Edit Profile
                </OvalButton>
              </>
            )}
          </div>
        </div>
        <div className={styles.profilePlayerBody}>
          {editMode ? (
            <ProfileEdit data={person} />
          ) : (
            <ProfileDetails data={person} isPublic={isPublic} />
          )}
          {!editMode && (
            <Link href="/connected-banks">
              <a>
                <DirectedButton direction="forward">
                  Connected Bank Accounts
                </DirectedButton>
              </a>
            </Link>
          )}
        </div>
      </div>
      {!editMode && (
        <>
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

          {/* Todo - Split as a component */}
          <div className={styles.profilePhotos}>
            <div className={styles.profilePhotosItem}>
              <img src="/assets/photo1.png"></img>
              <div className={styles.profilePhotosOptions}>
                <a>
                  <EditPhoto />
                </a>
                <a>
                  <Thrash />
                </a>
              </div>
            </div>
            <div className={styles.profilePhotosItem}>
              <img src="/assets/photo2.png" />
              <div className={styles.profilePhotosOptions}>
                <a>
                  <EditPhoto />
                </a>
                <a>
                  <Thrash />
                </a>
              </div>
            </div>
            <div className={styles.profilePhotosItem}>
              <img src="/assets/photo3.png" />
              <div className={styles.profilePhotosOptions}>
                <a>
                  <EditPhoto />
                </a>
                <a>
                  <Thrash />
                </a>
              </div>
            </div>
            <div className={styles.profilePhotosItem}>
              <img src="/assets/photo2.png" />
              <div className={styles.profilePhotosOptions}>
                <a>
                  <EditPhoto />
                </a>
                <a>
                  <Thrash />
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileSelf;
