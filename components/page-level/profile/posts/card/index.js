import React, { useState } from "react";
import Link from "next/link";
import styles from "./postCard.module.css";

function ProfilePostCard({ post }) {
  // TODO: add likes, comments, reposts, views count
  const [contentItem, setContentItem] = useState(
    post?.thumbnail || post?.media
  );

  return (
    <Link href={`/content/${post?.id}`}>
      <div className={styles.profilePhotosItem}>
        <>
          {contentItem?.includes("video") && <video src={contentItem}></video>}
          {contentItem?.includes("image") && <img src={contentItem}></img>}
        </>
      </div>
    </Link>
  );
}

export default ProfilePostCard;
