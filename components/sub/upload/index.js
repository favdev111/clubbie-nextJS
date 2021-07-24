import React from "react";
import styles from "./index.module.css";
import UploadSVG from "@svg/upload";
import DeleteMedia from "@svg/delete-media";

function UploadMedia({ onFileChange, deleteMedia, media }) {
  return (
    <>
      <div className={styles.dragDropVideos}>
        <input
          hidden
          accept="image/*,video/*"
          id="icon-button-file"
          type="file"
          onChange={onFileChange}
        />
        <label htmlFor="icon-button-file">
          <UploadSVG />
        </label>
        <span className={styles.marginTop}>
          <span>Drag and drop a video or</span>
          &ensp;
          <a className={styles.dragDropVideosBrowseFiles}>
            <label htmlFor="icon-button-file">Browser Files</label>
          </a>
        </span>
      </div>
      <div className={styles.coverImage}>
        <div onClick={deleteMedia} className={styles.deleteImage}>
          <DeleteMedia />
        </div>
        {media?.src && <img src={media?.src} />}
      </div>
    </>
  );
}

export default UploadMedia;
