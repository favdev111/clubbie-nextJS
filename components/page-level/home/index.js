import React from "react";
import styles from "./index.module.css";
import CommonSearch from "@sub/search";

function Home() {
  return (
    <div className={styles.homePage}>
      <CommonSearch />
    </div>
  );
}

export default Home;
