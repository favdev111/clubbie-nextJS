import React from "react";
import styles from "./profiledetails.module.scss"
import cn from "classnames"

function ProfileDetails({ data, isPublic }) {
  return !isPublic ? (
    <div className={styles.profilePlayerBodyContent}>
      <div className={cn(styles.span3, styles.profilePlayerBodyContentItem)}>
        Bio
        <p> {data.bio} </p>
      </div>
      <div className={cn(styles.span1, styles.profilePlayerBodyContentItem)}>
        Email
        <p> {data.email}</p>
      </div>
      <div className={cn(styles.span1, styles.profilePlayerBodyContentItem)}>
        Telephone
        <p> {data.telephone}</p>
      </div>
      <div className={cn(styles.span1, styles.profilePlayerBodyContentItem)}>
        City
        <p> {data.city}</p>
      </div>
      <div className={cn(styles.span1, styles.profilePlayerBodyContentItem)}>
        Country
        <p> {data.country}</p>
      </div>
      <div className={cn(styles.span1, styles.profilePlayerBodyContentItem)}>
        Post code
        <p> {data.postCode}</p>
      </div>
    </div>
  ) : (
    <div className={styles.profilePlayerBodyContent}>
      <div className={cn(styles.span3, styles.profilePlayerBodyContentItem)}>
        Bio
        <p> {data.bio} </p>
      </div>
    </div>
  );
}

export default ProfileDetails;
