import React from "react";
import cn from "classnames";
import styles from "./loader.module.css";

const Loader = ({ size, padded }) => {
  return (
    <div
      className={cn(
        styles.loading,
        padded && styles.padded,
        size === "medium" && styles.medium,
        size === "large" && styles.large
      )}
    ></div>
  );
};
export default Loader;
