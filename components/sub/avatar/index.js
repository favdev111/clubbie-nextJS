import React, { useState } from "react";
import ContentDialog from "@sub/content-dialog";
import styles from "./index.module.css";
import cn from "classnames";
import EditProfilePic from "@svg/edit-profile-pic";

function Avatar({
  src,
  className,
  editMode,
  onImagePicked,
  fullScreenOnClick,
}) {
  const [image, setImage] = useState(null);
  const [displayFullScreen, setDisplayFullScreen] = useState(false);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const imagePicked = {
        src: e.target.result,
        file,
      };
      setImage(imagePicked);
      onImagePicked(imagePicked);
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    if (fullScreenOnClick) {
      setDisplayFullScreen((x) => !x);
    }
  };

  return (
    <>
      <ContentDialog
        open={displayFullScreen}
        setOpen={setDisplayFullScreen}
        Body={() => (
          <img
            className={cn(className, styles.imageFullScreen)}
            src={image?.src || src}
          />
        )}
        hideActionButtons={true}
      ></ContentDialog>
      <div
        className={cn(
          styles.avatar,
          !fullScreenOnClick
            ? styles.avatarHoverOpacity
            : styles.avatarHoverCursor
        )}
      >
        {editMode && (
          <>
            <input
              hidden
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={onFileChange}
            />

            <div>
              <div className={styles.edit}>
                <label htmlFor="icon-button-file">
                  <span>
                    <EditProfilePic className={styles.pointer} />
                  </span>
                </label>
              </div>
            </div>
          </>
        )}
        <img
          className={cn(className, styles.image)}
          src={image?.src || src}
          onClick={handleImageClick}
        />
      </div>
    </>
  );
}

export default Avatar;
