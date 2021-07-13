import React, { useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import SocialButton from "@sub/social-button";
import cn from "classnames";
import InViewMonitor from 'react-inview-monitor';
import Video from './Video';

function HomeVideosCard({ createdPost, data }) {
  const {
    id,
    description,
    media,
    thumbnail,
    author,
    createdAt,
    contentType,
    counts,
  } = data;

  const [content] = useState(media || thumbnail);

  return (
    <div
      className={cn(
        styles.videoCard,
        createdPost === id && styles.highLightPost
      )}
    >
      <Link href={`/content/${id}`}>
        <span>
          {content.includes("video") ? (
          <InViewMonitor
            childPropsInView={{isPlaying: true, sTyling: styles.preview}}
            toggleChildPropsOnInView={true}
          >
            <Video src={content} />
          </InViewMonitor>
          ) : content.includes("image") ? (
            <img className={styles.preview} src={content} />
          ) : (
            <></>
          )}
        </span>
      </Link>
      <div className={styles.cardInfoHeader}>
        <div className={styles.cardInfoProfile}>
          <Link href={`/profile/${author?.id}`}>
            <img
              className={styles.postAuthorImage}
              src={author?.image || "/assets/person-placeholder.jpg"}
            />
          </Link>
          <div className={styles.avatarInfo}>
            <p className="text-18">
              <Link href={`/profile/${author?.id}`}>
                <p className="text-18" className={styles.postAuthorName}>
                  {author?.name || author?.id}
                </p>
              </Link>
            </p>
            <p className={cn("opacity-50", styles.postDate)}>
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <SocialButton type="upload" />
      </div>

      <p className={styles.desc}> {description}</p>
      <p className={cn("opacity-50", styles.viewCount)}>
        {counts?.views || counts?.views === 0
          ? `${counts?.views} View${
              counts?.views > 1 || counts?.views < 1 ? "s" : ""
            }`
          : ""}
      </p>
      {/* buttons */}
      <div className={styles.socialButtons}>
        <SocialButton type="fav">{counts?.likes || "0"}</SocialButton>
        <SocialButton type="repost">{counts?.reposts || "0"}</SocialButton>
        <SocialButton type="send" />
        <SocialButton type="comment">{counts?.comments || "0"}</SocialButton>
      </div>
    </div>
  );
}

export default HomeVideosCard;
