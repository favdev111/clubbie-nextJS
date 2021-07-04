import React, { useState } from "react";
import Link from "next/link";
import styles from "./postCard.module.css";
import FavSVG from "@svg/social/fav";
import EyeSVG from "@svg/eye";
import CommentSVG from "@svg/social/comment";
import RepostSVG from "@svg/repost";

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
          <div className={styles.profilePhotosOptions}>
            <span>
              <FavSVG />
              {post?.counts?.likes}
            </span>
            <span>
              <EyeSVG filled />
              {post?.counts?.views}
            </span>
            <span>
              <CommentSVG />
              {post?.counts?.comments}
            </span>
            <span>
              <RepostSVG filled />
              {post?.counts?.reposts}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ProfilePostCard;
