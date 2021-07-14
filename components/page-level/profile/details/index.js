import React from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import OvalButton from "@sub/button-oval";
import EditProfileSVG from "@svg/edit-profile";
import BankingInfo from "./banking";
import ProfileInfo from "./info";
import authUser from "@utils/helpers/auth";
import styles from "./profiledetails.module.css";

function ProfileDetails({ profileInfo, isPublic, clubs }) {
  const router = useRouter();
  const user = authUser.getUser();

  return (
    <>
      <div className={styles.profilePlayerHeader}>
        <div className={styles.profilePlayerHeaderInnerLeft}>
          <ProfileInfo
            image={
              profileInfo?.profile?.image || "/assets/person-placeholder.jpg"
            }
            isPublic={isPublic}
            footballerName={profileInfo?.profile?.fullName || profileInfo?.id}
            playerTitle={profileInfo?.profile?.playerTitle}
            clubs={clubs}
          />
        </div>
        <div className={styles.profilePlayerHeaderInnerRight}>
          {!isPublic ? (
            <>
              <a className={styles.profileEditIcon}>
                <EditProfileSVG />
              </a>

              <OvalButton
                isPublic={isPublic}
                appearence="edit"
                classes={styles.profileEditButton}
                onClick={() => router.push("/profile/self/edit")}
              >
                Edit Profile
              </OvalButton>
            </>
          ) : (
            <OvalButton
              isPublic={isPublic}
              appearence="message"
              classes={styles.profileEditButton}
            >
              Message
            </OvalButton>
          )}
        </div>
      </div>
      <div className={styles.profilePlayerBody}>
        {!isPublic ? (
          <>
            <div className={styles.profilePlayerBodyContent}>
              {profileInfo?.profile?.bio && (
                <div
                  className={cn(
                    styles.span3,
                    styles.profilePlayerBodyContentItem
                  )}
                >
                  Bio
                  <p> {profileInfo?.profile?.bio} </p>
                </div>
              )}
              {profileInfo?.profile?.email && (
                <div
                  className={cn(
                    styles.span1,
                    styles.profilePlayerBodyContentItem
                  )}
                >
                  Email
                  <p> {profileInfo?.profile?.email}</p>
                </div>
              )}
              {profileInfo?.profile?.telephone && (
                <div
                  className={cn(
                    styles.span1,
                    styles.profilePlayerBodyContentItem
                  )}
                >
                  Telephone
                  <p> {profileInfo?.profile?.telephone}</p>
                </div>
              )}
              {profileInfo?.profile?.address && (
                <div
                  className={cn(
                    styles.span1,
                    styles.profilePlayerBodyContentItem
                  )}
                >
                  Address
                  <p> {profileInfo?.profile?.address}</p>
                </div>
              )}
              {profileInfo?.profile?.city && (
                <div
                  className={cn(
                    styles.span1,
                    styles.profilePlayerBodyContentItem
                  )}
                >
                  City
                  <p> {profileInfo?.profile?.city}</p>
                </div>
              )}
              {profileInfo?.profile?.country && (
                <div
                  className={cn(
                    styles.span1,
                    styles.profilePlayerBodyContentItem
                  )}
                >
                  Country
                  <p> {profileInfo?.profile?.country}</p>
                </div>
              )}
              {profileInfo?.profile?.postCode && (
                <div
                  className={cn(
                    styles.span1,
                    styles.profilePlayerBodyContentItem
                  )}
                >
                  Post code
                  <p> {profileInfo?.profile?.postCode}</p>
                </div>
              )}
            </div>
            <BankingInfo user={user} />
          </>
        ) : (
          <div className={styles.profilePlayerBodyContent}>
            {profileInfo?.profile?.bio && (
              <div
                className={cn(
                  styles.span3,
                  styles.profilePlayerBodyContentItem
                )}
              >
                Bio
                <p> {profileInfo?.profile?.bio} </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileDetails;
