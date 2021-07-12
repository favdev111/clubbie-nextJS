import React from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import OvalButton from "@sub/button-oval";
import EditProfileSVG from "@svg/edit-profile";
import BankingInfo from "./banking";
import ProfileInfo from "./info";
import styles from "./profiledetails.module.css";

function ProfileDetails({ profile, isPublic, clubs }) {
  const router = useRouter();

  return (
    <>
      <div className={styles.profilePlayerHeader}>
        <div className={styles.profilePlayerHeaderInnerLeft}>
          <ProfileInfo
            image={profile?.image || "/assets/person-placeholder.jpg"}
            isPublic={isPublic}
            footballerName={profile?.fullName || profile?.id}
            playerTitle={profile?.playerTitle}
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
              {profile?.bio && (
                <div
                  className={cn(
                    styles.span3,
                    styles.profilePlayerBodyContentItem
                  )}
                >
                  Bio
                  <p> {profile?.bio} </p>
                </div>
              )}
              {profile?.email && (
                <div
                  className={cn(
                    styles.span1,
                    styles.profilePlayerBodyContentItem
                  )}
                >
                  Email
                  <p> {profile?.email}</p>
                </div>
              )}
              {profile?.telephone && (
                <div
                  className={cn(
                    styles.span1,
                    styles.profilePlayerBodyContentItem
                  )}
                >
                  Telephone
                  <p> {profile?.telephone}</p>
                </div>
              )}
              {profile?.address && (
                <div
                  className={cn(
                    styles.span1,
                    styles.profilePlayerBodyContentItem
                  )}
                >
                  Address
                  <p> {profile?.address}</p>
                </div>
              )}
              {profile?.city && (
                <div
                  className={cn(
                    styles.span1,
                    styles.profilePlayerBodyContentItem
                  )}
                >
                  City
                  <p> {profile?.city}</p>
                </div>
              )}
              {profile?.country && (
                <div
                  className={cn(
                    styles.span1,
                    styles.profilePlayerBodyContentItem
                  )}
                >
                  Country
                  <p> {profile?.country}</p>
                </div>
              )}
              {profile?.postCode && (
                <div
                  className={cn(
                    styles.span1,
                    styles.profilePlayerBodyContentItem
                  )}
                >
                  Post code
                  <p> {profile?.postCode}</p>
                </div>
              )}
            </div>
            <BankingInfo />
          </>
        ) : (
          <div className={styles.profilePlayerBodyContent}>
            {profile?.bio && (
              <div
                className={cn(
                  styles.span3,
                  styles.profilePlayerBodyContentItem
                )}
              >
                Bio
                <p> {profile?.bio} </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileDetails;
