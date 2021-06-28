import React from "react";
import Link from "next/link";
import styles from "./index.module.css";
import SocialButton from "@sub/social-button";
import cn from "classnames";

function HomeVideosCard({ data }) {
  const {
    id,
    description,
    media,
    thumbnail,
    author,
    createdAt,
    views,
    contentType,
  } = data;

  return (
    <div className={styles.videoCard}>
      <Link href={`/content/${id}`}>
        <span>
          {contentType === "video" ? (
            <video
              className={styles.preview}
              src={media || thumbnail}
              controls
            />
          ) : contentType === "image" ? (
            <img className={styles.preview} src={media || thumbnail} />
          ) : (
            <></>
          )}
        </span>
      </Link>
      <div className={styles.cardInfoHeader}>
        <div className={styles.cardInfoProfile}>
          <img
            src={author?.profile?.image || "/assets/person-placeholder.jpg"}
          />
          <div className={styles.avatarInfo}>
            <p className="text-18">{author?.name || "author name"}</p>
            <p className="opacity-50">{new Date(createdAt).toLocaleString()}</p>
          </div>
        </div>
        <SocialButton type="upload" />
      </div>

      <p className={styles.desc}> {description}</p>
      <p className={cn("opacity-50", styles.viewCount)}>
        {" "}
        {views || views === 0
          ? `${views} View${views > 1 || views < 1 ? "s" : ""}`
          : ""}
      </p>
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
