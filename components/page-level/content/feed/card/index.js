import React, { useState, useRef } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import SocialButton from "@sub/social-button";
// import InView from "@sub/hook-inview";
import InViewMonitor from "react-inview-monitor";
import Video from "./Video";
import useNotifications from "@sub/hook-notification";
import TimeAgo from "@sub/time-ago";
import cn from "classnames";
import { LikeButton } from "../../common/button-like";
// import { RepostButton } from "../../common/button-repost";
import { ShareButton } from "../../common/button-share";

function HomeVideosCard({
  createdPost,
  data,
  teamId,
  isLoggedIn,
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
  const [isLiked, setIsLiked] = useState(myInteractions?.liked);
  // const [repostCount, setRepostCount] = useState(counts?.reposts || 0);
  // const [repostProfileCount, setRepostProfileCount] = useState(
  //   myInteractions?.repostedInProfile || 0
  // );
  // const [repostTeamCount, setRepostTeamCount] = useState(
  //   myInteractions?.repostedInTeam || 0
  // );
  // const [isReposted, setIsReposted] = useState(
  //   !!myInteractions?.repostedInProfile
  // );

  const verifyLoggedIn = () => {
    if (isLoggedIn) return true;
    setShowLoginPopup(true);
    return false;
  };

  const videoElRef = useRef();
  const videoInPlayRef = useRef();
  const playVideo = () => {
    if (!videoElRef?.current?.src) {
      videoElRef?.current?.load();
    }
    if (videoInPlayRef?.current?.src && videoElRef.current) {
      videoInPlayRef?.current?.pause();
    }
    videoInPlayRef.current = videoElRef?.current;
    setTimeout(function () {
      videoElRef?.current?.play();
    }, 500);
  };
  const stopVideo = () => {
    videoElRef?.current?.pause();
  };

  const postLink = () => {
    let base = `/content/${id}`;
    if (teamId) base += `?teamId=${teamId}`;
    return base;
  };

  return (
    <div
      className={cn(
        styles.videoCard,
        createdPost === id && styles.highLightPost
      )}
    >
      <Link href={postLink()}>
        <a>
          <span>
            {content.includes("video") ? (
              // <InView onVisiable={playVideo} onHidden={stopVideo}>
              //   <video
              //     className={styles.preview}
              //     ref={videoElRef}
              //     controls
              //     loop
              //     // muted
              //   >
              //     <source src={content} type="video/mp4" />
              //   </video>
              // </InView>
              <InViewMonitor
                childPropsInView={{ isPlaying: true, styling: styles.preview }}
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
              <TimeAgo date={createdAt} />
            </p>
          </div>
        </div>
        <div className={styles.actionButtons}>
          <LikeButton
            liked={isLiked}
            postId={id}
            count={likeCount}
            showNotificationMsg={showNotificationMsg}
            onClick={(likeHandler) => {
              if (!verifyLoggedIn()) return;
              likeHandler();
            }}
            onLiked={(likeId) => {
              setIsLiked(likeId);
              setLikeCount((count) => count + 1);
            }}
            onUnliked={() => {
              setIsLiked(false);
              setLikeCount((count) => count - 1);
            }}
          />
          {/* <SocialButton type="send" /> */}
          <Link href={`${postLink()}?focusComment=true`}>
            <a>
              <SocialButton type="comment">
                {counts?.comments || "0"}
              </SocialButton>
            </a>
          </Link>
          <ShareButton postTitle={title} postMedia={content} />
        </div>
      </div>
      <div className={styles.current}>
        <h4 className={styles.desc}> {title}</h4>
        <p className={cn("opacity-50", styles.viewCount)}>
          {counts?.views || counts?.views === 0
            ? `${counts?.views} View${
                counts?.views > 1 || counts?.views < 1 ? "s" : ""
              }`
            : ""}
        </p>
      </div>
    </div>
  );
}

export default HomeVideosCard;
