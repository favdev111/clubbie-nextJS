import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";
import LeftAngleSVG from "@svg/left-angle";
import RightAngleSVG from "@svg/right-angle";
import styles from "./index.module.css";

function FullScreenGallery({ display, setDisplay, galleryItems, activeIndex }) {
  const [_galleryItems] = useState(galleryItems);
  const [_activeIndex, setActiveIndex] = useState(activeIndex || 0);
  const videoRef = useRef();

  const onPreviousButtonClick = () => {
    const index =
      _activeIndex - 1 < 0 ? _galleryItems.length - 1 : _activeIndex - 1;
    setActiveIndex(index);
  };

  const onNextButtonClick = () => {
    const index =
      _activeIndex + 1 > _galleryItems.length - 1 ? 0 : _activeIndex + 1;
    setActiveIndex(index);
  };

  useEffect(() => {
    if (display === true) {
      document.addEventListener("keydown", handleEscape, false)
    }
  }, [display])

  useEffect(() => {
    setActiveIndex(activeIndex)
  }, [activeIndex])

  const handleEscape = (e) => {
    if (e.key === "Escape") {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setDisplay(false);
    }
  };

  return (
    <div className={cn(styles.fullScreen, display && styles.showfullScreen)}>
      <div className={styles.gallery} tabIndex="0">
        <div
          className={styles.previewItemButton}
          onClick={onPreviousButtonClick}
        >
          <span>
            <LeftAngleSVG />
          </span>
        </div>
        <div className={styles.galleryItems}>
          {_galleryItems[_activeIndex]?.includes("video") && (
            <video
              className={styles.galleryItemFocused}
              src={_galleryItems[_activeIndex]}
              autoPlay
              controls
              loop
              muted
              tabIndex="1"
              ref={videoRef}
            ></video>
          )}
          {_galleryItems[_activeIndex]?.includes("image") && (
            <img
              className={styles.galleryItemFocused}
              src={_galleryItems[_activeIndex]}
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
