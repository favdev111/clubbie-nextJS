import React from "react";
import styles from "./profiledetails.module.css";
import cn from "classnames";
import Link from "next/link";
import DirectedButton from "@sub/button-directed";
import ProfileInfo from "../info";
import OvalButton from "@sub/button-oval";
import EditProfileSVG from "@svg/edit-profile";
import { useRouter } from "next/router";

function ProfileDetails({ join, profile, isPublic }) {
  const router = useRouter();

  return (
    <>
      <div className={styles.profilePlayerHeader}>
        <div className={styles.profilePlayerHeaderInnerLeft}>
          <ProfileInfo
            image={profile?.image || "/assets/person-placeholder.jpg"}
            join={join}
            footballerName={profile?.fullname}
            playerTitle={profile?.playerTitle}
          />
        </div>
        <div className={styles.profilePlayerHeaderInnerRight}>
          {!isPublic && (
            <>
              <a className={styles.profileEditIcon}>
                <EditProfileSVG />
              </a>

              <OvalButton
                isPublic={isPublic}
                appearence="edit"
                classes={styles.profileEditButton}
                onClick={() => router.push("/profile-self/edit")}
              >
                Edit Profile
              </OvalButton>
            </>
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
            <Link href="/connected-banks">
              <a>
                <DirectedButton direction="forward">
                  Connected Bank Accounts
                </DirectedButton>
              </a>
            </Link>
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
