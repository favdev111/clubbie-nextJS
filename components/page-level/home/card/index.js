import React from "react";
import Link from "next/link";
import styles from "./index.module.css";
import SocialButton from "@sub/social-button";
import cn from "classnames";

function HomeVideosCard({ data }) {
  const { id, description, media, author, createdAt } = data;

  return (
    <div className={styles.videoCard}>
      <Link href={`/content/${id}`}>
        <span>
          {media?.includes("video") && (
            <video className={styles.preview} src={media} controls />
          )}
          {media?.includes("image") && (
            <img className={styles.preview} src={media} />
          )}
        </span>
      </Link>
      <div className={styles.cardInfoHeader}>
        <div className={styles.cardInfoProfile}>
          <img
            src={author?.profile?.image || "/assets/person-placeholder.jpg"}
          />
          <div className={styles.avatarInfo}>
            <p className="text-18">
              {author?.profile?.fullName || "author name"}
            </p>
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
