import React from "react";
import styles from "./contentMediaCard.module.css";
import UploadSVG from "@svg/upload";

function ContentMediaCard({ media, setMedia }) {
  const handleOnClick = () => setMedia(null);

  return media ? (
    <div className={styles.profilePhotosItem}>
      {media?.src?.includes("image") && <img src={media.src}></img>}
      {media?.src?.includes("video") && (
        <video src={media.src} controls></video>
      )}
      {/* TODO: replace with svg comp */}
      <span
        style={{
          color: "#ffffff",
          background: "#c41d24",
          position: "absolute",
          right: -10,
          top: -10,
          height: 35,
          width: 35,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        }}
        onClick={handleOnClick}
      >
        x
      </span>
    </div>
  ) : (
    <div className={styles.profilePhotosItem}>
      <div className={styles.profileImagePicker}>
        <UploadSVG></UploadSVG>
      </div>
    </div>
  );
}

export default ContentMediaCard;
