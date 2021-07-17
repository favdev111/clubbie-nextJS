import React, { useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import SocialButton from "@sub/social-button";
import useNotifications from "@sub/hook-notification";
import cn from "classnames";
import InViewMonitor from "react-inview-monitor";
import Video from "./Video";
import { LikeButton } from "../../common/button-like";
import { RepostButton } from "../../common/button-repost";

function HomeVideosCard({
  createdPost,
  data,
  isLoggedIn,
  user,
  setShowLoginPopup,
}) {
  const {
    id,
    title,
    media,
    thumbnail,
    author,
    createdAt,
    contentType,
    counts,
    myInteractions,
  } = data;

  const { showNotificationMsg } = useNotifications();

  const [content] = useState(media || thumbnail);
  const [likeCount, setLikeCount] = useState(counts?.likes || 0);
  const [isLiked, setIsLiked] = useState(!!myInteractions?.liked);
  const [repostCount, setRepostCount] = useState(counts?.reposts || 0);
  const [repostProfileCount, setRepostProfileCount] = useState(
    myInteractions?.repostedInProfile || 0
  );
  const [repostTeamCount, setRepostTeamCount] = useState(
    myInteractions?.repostedInTeam || 0
  );
  const [isReposted, setIsReposted] = useState(
    !!myInteractions?.repostedInProfile
  );

  const verifyLoggedIn = () => {
    if (isLoggedIn) return true;
    setShowLoginPopup(true);
    return false;
  };

  return (
    <div
      className={cn(
        styles.videoCard,
        createdPost === id && styles.highLightPost
      )}
    >
      <Link href={`/content/${id}`}>
        <a>
          <span>
            {content.includes("video") ? (
              <InViewMonitor
                childPropsInView={{ isPlaying: true, sTyling: styles.preview }}
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
        </a>
      </Link>
      <div className={styles.cardInfoHeader}>
        <div className={styles.cardInfoProfile}>
          <Link href={`/profile/${author?.id}`}>
            <a>
              <img
                className={styles.postAuthorImage}
                src={author?.image || "/assets/person-placeholder.jpg"}
              />
            </a>
          </Link>
          <div className={styles.avatarInfo}>
            <p className="text-18">
              <Link href={`/profile/${author?.id}`}>
                <a>
                  <p className="text-18" className={styles.postAuthorName}>
                    {author?.name || author?.id}
                  </p>
                </a>
              </Link>
            </p>
            <p className={cn("opacity-50", styles.postDate)}>
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <SocialButton type="upload" />
      </div>
      <p className={styles.desc}> {title}</p>
      <p className={cn("opacity-50", styles.viewCount)}>
        {counts?.views || counts?.views === 0
          ? `${counts?.views} View${
              counts?.views > 1 || counts?.views < 1 ? "s" : ""
            }`
          : ""}
      </p>
      {/* buttons */}
      <div className={styles.socialButtons}>
        <LikeButton
          liked={isLiked}
          postId={id}
          count={likeCount}
          showNotificationMsg={showNotificationMsg}
          onClick={(likeHandler) => {
            if (!verifyLoggedIn()) return;
            likeHandler();
          }}
          onLiked={() => {
            setIsLiked(true);
            setLikeCount((count) => count + 1);
          }}
        />
        <RepostButton
          postId={id}
          reposted={isReposted}
          repostCount={repostCount}
          repostProfileCount={repostProfileCount}
          repostTeamCount={repostTeamCount}
          showNotificationMsg={showNotificationMsg}
          teamIds={user?.teams?.map((x) => x?.team)}
          onClick={(repostHandler) => {
            if (!verifyLoggedIn()) return;
            repostHandler();
          }}
          onProfileRepost={(originalPostId) => {
            if (originalPostId === id) {
              setRepostCount((count) => count + 1);
              setIsReposted(true);
              setRepostProfileCount((count) => count + 1);
            }
          }}
          onTeamRepost={(originalPostId) => {
            if (originalPostId === id) {
              setRepostCount((count) => count + 1);
              setIsReposted(true);
              setRepostTeamCount((count) => count + 1);
            }
          }}
        />
        <SocialButton type="send" />
        <SocialButton type="comment">{counts?.comments || "0"}</SocialButton>
      </div>
    </div>
  );
}

export default HomeVideosCard;
