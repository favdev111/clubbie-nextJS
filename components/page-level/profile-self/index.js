import React from "react";
import ProfileEdit from "./edit";
import ProfileDetails from "./details";
import styles from "./profileself.module.css";
import EditPhotoSVG from "@svg/edit-photo";
import ThrashSVG from "@svg/thrash";
import OvalButton from "@sub/button-oval";

function ProfileSelf({ join, isPublic, profile, editMode }) {
  return (
    <div className={styles.profile}>
      <h1 className={styles.profileTitle}>{editMode && "Edit "}Profile</h1>
      <div className={styles.profilePlayer}>
        {editMode && !isPublic ? (
          <ProfileEdit profile={profile} />
        ) : (
          <ProfileDetails profile={profile} isPublic={isPublic} join={join} />
        )}
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
                  <EditPhotoSVG />
                </a>
                <a>
                  <ThrashSVG />
                </a>
              </div>
            </div>
            <div className={styles.profilePhotosItem}>
              <img src="/assets/photo2.png" />
              <div className={styles.profilePhotosOptions}>
                <a>
                  <EditPhotoSVG />
                </a>
                <a>
                  <ThrashSVG />
                </a>
              </div>
            </div>
            <div className={styles.profilePhotosItem}>
              <img src="/assets/photo3.png" />
              <div className={styles.profilePhotosOptions}>
                <a>
                  <EditPhotoSVG />
                </a>
                <a>
                  <ThrashSVG />
                </a>
              </div>
            </div>
            <div className={styles.profilePhotosItem}>
              <img src="/assets/photo2.png" />
              <div className={styles.profilePhotosOptions}>
                <a>
                  <EditPhotoSVG />
                </a>
                <a>
                  <ThrashSVG />
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
