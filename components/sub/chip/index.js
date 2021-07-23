import React from "react";
import cn from "classnames";
import styles from "./chip.module.css";

const Chip = ({
  component,
  text,
  image,
  onCloseClick,
  background,
  roundedImage,
  className,
  size,
}) => {
  return (
    <div
      className={cn(
        styles.chip,
        background === "danger" && styles.backgroundDanger,
        background === "success" && styles.backgroundSuccess,
        className
      )}
    >
      {component ? (
        <div>{component}</div>
      ) : (
        <>
          {image && (
            <div className={styles.chipHead}>
              <img
                src={image}
                className={roundedImage && styles.roundedImage}
              />
            </div>
          )}
          <div className={styles.chipContent}>{text}</div>
          {onCloseClick && (
            <div className={styles.chipClose}>
              <svg
                className={cn(
                  styles.chipSvg,
                  size === "small" && styles.chipSvgSmall
                )}
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
                onClick={onCloseClick}
              >
                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                <path d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0" />
              </svg>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Chip;
