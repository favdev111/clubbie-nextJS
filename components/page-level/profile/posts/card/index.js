import React from "react";
import styles from "./postCard.module.css";
import EditPhotoSVG from "@svg/edit-photo";
import ThrashSVG from "@svg/thrash";

function ProfilePostCard({ post }) {
  // TODO: edit uploaded post + display info if needed
  // post: {
  //   contentType: "video",
  //   createdAt: "2021-06-14T21:07:10.087Z",
  //   id: "60c7c4fe0f599435d41b4e41",
  //   thumbnail: {
  //     s3Url:
  //       "https://s3.amazonaws.com/com.clubbie.post.videos.d…9835dff9/b7f9ace8-dab6-4a19-8020-54b66c9fdb10.mp4",
  //     mimetype: "video/mp4",
  //     id: "60c7c4fd0f599435d41b4e40",
  //   },
  //   title: "Football",
  // };
  return (
    <div className={styles.profilePhotosItem}>
      {post.contentType === "video" && (
        <video src={post?.thumbnail?.s3Url}></video>
      )}
      {post.contentType === "image" && <img src={post?.thumbnail?.s3Url}></img>}
      <div className={styles.profilePhotosOptions}>
        <a>
          <EditPhotoSVG />
        </a>
        <a>
          <ThrashSVG />
        </a>
      </div>
    </div>
  );
}

export default ProfilePostCard;
