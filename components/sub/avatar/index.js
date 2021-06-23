import React from "react";
import styles from "./index.module.css";
import cn from "classnames";
import EditProfilePic from "@svg/edit-profile-pic";

function Avatar({ src, className, editMode }) {
  /* Tip : 
  make <input type="file"/> and (opacity:0)
  and use ref to catch input when user click Avatar component */
  return (
    <div className={styles.avatar}>
      <img className={cn(className, editMode && styles.image)} src={src} />
      <div className={styles.edit}>
        <EditProfilePic />
      </div>
    </div>
  );
}

export default Avatar;