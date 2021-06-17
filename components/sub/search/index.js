import React from "react";
import styles from "./index.module.css";
import Search from "@svg/search";
function CommonSearch() {
  return (
    <div className={styles.commonSearch}>
      <a>
        <Search />
      </a>

      <input type="text" placeholder="Search" />
    </div>
  );
}

export default CommonSearch;
