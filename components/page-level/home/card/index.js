import React from "react";
import Link from "next/link";
import styles from "./index.module.css";
import SocialButton from "@sub/social-button";
import cn from "classnames";

function HomeVideosCard({ id, description, media, avatar, author, createdAt }) {
  return (
    <div className={styles.videoCard}>
      <Link href={`/content/${id}`}>
        <span>
          {media?.mimetype?.includes("video") && (
            <video className={styles.preview} src={media?.s3Url} controls />
          )}
          {media?.mimetype?.includes("image") && (
            <img className={styles.preview} src={media?.s3Url} />
          )}
        </span>
      </Link>
      <div className={styles.cardInfoHeader}>
        <div className={styles.cardInfoProfile}>
          <img src={avatar || "/assets/person-placeholder.jpg"} />
          <div className={styles.avatarInfo}>
            <p className="text-18"> {author || "author name"}</p>
            <p className="opacity-50">{new Date(createdAt).toLocaleString()}</p>
          </div>
        </div>
        <SocialButton type="upload" />
      </div>

      <p className={styles.desc}> {description}</p>
      <p className={cn("opacity-50", styles.viewCount)}> 255 views</p>
      {/* buttons */}
      <div className={styles.socialButtons}>
        <SocialButton type="fav">15</SocialButton>
        <SocialButton type="repost">5</SocialButton>
        <SocialButton type="send" />
        <SocialButton type="comment" />
      </div>
    </div>
  );
}

export default HomeVideosCard;
