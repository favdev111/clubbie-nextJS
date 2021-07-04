import React, { useState } from "react";
import Link from "next/link";
import styles from "./postCard.module.css";

function ProfilePostCard({ post }) {
  // TODO: add likes, comments, reposts, views count
  const [contentItem, setContentItem] = useState(
    post?.thumbnail || post?.media
  );
  const [loaded, setLoaded] = useState(
    contentItem?.includes("video") ? true : false
  );

  return (
    <>
      <Link href={`/content/${post?.id}`}>
        <div className={styles.profilePhotosItem}>
          <span className={!loaded && styles.hidden}>
            {contentItem?.includes("video") && (
              <video src={contentItem}></video>
            )}
            {contentItem?.includes("image") && (
              <img src={contentItem} onLoad={() => setLoaded(true)}></img>
            )}
          </span>
          <div className={!loaded && styles.loadingPost}></div>
        </div>
      </Link>
    </>
  );
}

export default ProfilePostCard;
