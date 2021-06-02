import React from "react";
import styles from "./index.module.css";

function CommonSearch() {
  return (
    <div className={styles.commonSearch}>
      <img src="/assets/search.svg" />

      <input type="text" placeholder="Search" />
    </div>
  );
}

export default CommonSearch;
