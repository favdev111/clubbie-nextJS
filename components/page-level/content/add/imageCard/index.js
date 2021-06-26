import React from "react";
import styles from "./contentImageCard.module.css";
import UploadSVG from "@svg/upload";

function ContentImageCard({ image }) {
  return image ? (
    <div className={styles.profilePhotosItem}>
      <img src={image.src}></img>
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

export default ContentImageCard;
