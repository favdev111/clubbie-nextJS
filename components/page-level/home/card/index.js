import React, { useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import SocialButton from "@sub/social-button";
import BackDropLoader from "@sub/backdrop-loader";
import useNotifications from "@sub/hook-notification";
import DropDown from "@sub/dropdown";
import Posts from "@api/services/Posts";
import Interactions from "@api/services/interactions";
import cn from "classnames";
import InViewMonitor from "react-inview-monitor";
import Video from "./Video";

function HomeVideosCard({ createdPost, data, isLoggedIn, setShowLoginPopup }) {
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

  // console.log(data);
  console.log("interactions => ", myInteractions);

  const { showNotificationMsg } = useNotifications();

  const [content] = useState(media || thumbnail);
  const [likeCount, setLikeCount] = useState(counts?.likes || 0);
  const [isLiked, setIsLiked] = useState(!!myInteractions?.liked);
  const [repostCount, setRepostCount] = useState(counts?.reposts || 0);
  const [repostProfileCount, setRepostProfileCount] = useState(
    myInteractions?.repostedInProfile || 0
  );
  const [isRepostedInProfile, setIsRepostedInProfile] = useState(
    !!myInteractions?.repostedInProfile
  );
  const [loading, setLoading] = useState(false);

  const verifyLoggedIn = () => {
    if (isLoggedIn) return true;
    setShowLoginPopup(true);
    return false;
  };

  const handleLikeClick = async () => {
    if (!verifyLoggedIn()) return;
    if (!isLiked) {
      const response = await Interactions.LikePost(id).catch(() => null);
      if (!response) {
        showNotificationMsg("Error liking post. Try again..!", {
          variant: "error",
          displayIcon: true,
        });
        return;
      }
      setIsLiked(true);
      setLikeCount((count) => count + 1);
    } else {
      // TODO: remove interaction
      showNotificationMsg("Remove Post Like");
    }
  };

  const repostInProfile = async () => {
    if (!verifyLoggedIn()) return;
    setLoading(true);
    const response = await Posts.Repost(id, {
      repostIn: "profile",
    }).catch((e) => {
      console.log(e.response);
      return null;
    });
    if (!response) {
      showNotificationMsg("Error Reposting In Profile", {
        variant: "error",
        displayIcon: true,
      });
      setLoading(false);
      return;
    }
    showNotificationMsg("Reposted In Profile", {
      variant: "success",
      displayIcon: true,
    });
    setIsRepostedInProfile(true);
    setRepostCount((count) => count + 1);
    setRepostProfileCount((count) => count + 1);
    setLoading(false);
  };

  return (
    <div
      className={cn(
        styles.videoCard,
        createdPost === id && styles.highLightPost
      )}
    >
      {loading && <BackDropLoader />}
      <Link href={`/content/${id}`}>
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
        <SocialButton type="fav" highlight={isLiked} onClick={handleLikeClick}>
          {likeCount + ""}
        </SocialButton>
        <DropDown
          Component={() => (
            <SocialButton type="repost" highlight={isRepostedInProfile}>
              {repostCount + ""}
            </SocialButton>
          )}
          title="Repost In"
          list={[
            {
              onClick: repostInProfile,
              title:
                "Profile" +
                (repostProfileCount > 0 ? " (" + repostProfileCount + ")" : ""),
            },
            {
              onClick: () => alert("repost in teams"),
              title: "Team",
              seperator: true,
            },
          ]}
        ></DropDown>
        <SocialButton type="send" />
        <SocialButton type="comment">{counts?.comments || "0"}</SocialButton>
      </div>
    </div>
  );
}

export default HomeVideosCard;
