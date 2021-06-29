import React from "react";
import Link from "next/link";
import styles from "./postCard.module.css";

function ProfilePostCard({ post }) {
  // TODO: add likes, comments, reposts, views count

  return (
    <Link href={`/content/${post?.id}`}>
      <div className={styles.profilePhotosItem}>
        {post?.contentType === "video" && (
          <video src={post?.thumbnail || post?.media}></video>
        )}
        {post?.contentType === "image" && (
          <img src={post?.thumbnail || post?.media}></img>
        )}
      </div>
    </Link>
  );
}

export default ProfilePostCard;
