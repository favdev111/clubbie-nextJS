import React, { useState } from "react";
import cn from "classnames";
import LeftAngleSVG from "@svg/left-angle";
import RightAngleSVG from "@svg/right-angle";
import styles from "./index.module.css";

function FullScreenGallery({ display, setDisplay, galleryItems }) {
  const [_galleryItems] = useState(galleryItems);
  const [activeIndex, setActiveIndex] = useState(0);

  const onPreviousButtonClick = () => {
    const index =
      activeIndex - 1 < 0 ? _galleryItems.length - 1 : activeIndex - 1;
    setActiveIndex(index);
  };

  const onNextButtonClick = () => {
    const index =
      activeIndex + 1 > _galleryItems.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(index);
  };

  const handleEscape = (e) => {
    if (e.key === "Escape") {
      setDisplay(false);
    }
  };

  return (
    <div className={cn(styles.fullScreen, display && styles.showfullScreen)}>
      <div className={styles.gallery} onKeyDown={handleEscape} tabIndex="0">
        <div
          className={styles.previewItemButton}
          onClick={onPreviousButtonClick}
        >
          <span>
            <LeftAngleSVG />
          </span>
        </div>
        <div className={styles.galleryItems}>
          {_galleryItems[activeIndex]?.includes("video") && (
            <video
              className={styles.galleryItemFocused}
              src={_galleryItems[activeIndex]}
              autoPlay
              controls
              loop
              onKeyDown={handleEscape}
              tabIndex="1"
            ></video>
          )}
          {_galleryItems[activeIndex]?.includes("image") && (
            <img
              className={styles.galleryItemFocused}
              src={_galleryItems[activeIndex]}
              onKeyDown={handleEscape}
              tabIndex="1"
            />
          )}
        </div>
        <div className={styles.nextItemButton} onClick={onNextButtonClick}>
          <span>
            <RightAngleSVG />
          </span>
        </div>
      </div>
    </div>
  );
}

export default FullScreenGallery;
