import React, { useState } from "react";
import cn from "classnames";
import Link from "next/link";
import styles from "./postCard.module.css";
import FavSVG from "@svg/social/fav";
import EyeSVG from "@svg/eye";
import CommentSVG from "@svg/social/comment";
// import RepostSVG from "@svg/repost";

function ProfilePostCard({ post }) {
  const [contentItem, setContentItem] = useState(
    post?.thumbnail || post?.media
  );
  const [loaded, setLoaded] = useState(
    contentItem?.includes("video") ? true : false
  );

  return (
    <>
      <Link href={`/content/${post?.id}`}>
        <a>
          <div className={styles.profilePhotosItem}>
            <span className={cn(styles.media, !loaded && styles.hidden)}>
              {contentItem?.includes("video") && (
                <video src={contentItem}></video>
              )}
              {contentItem?.includes("image") && (
                <img src={contentItem} onLoad={() => setLoaded(true)}></img>
              )}
              <div className={styles.mediaCounts}>
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
                {/* <span>
                  <RepostSVG filled />
                  {post?.counts?.reposts}
                </span> */}
              </div>
            </span>
            <div className={!loaded && styles.loadingPost}></div>
          </div>
        </a>
      </Link>
    </>
  );
}

export default ProfilePostCard;
