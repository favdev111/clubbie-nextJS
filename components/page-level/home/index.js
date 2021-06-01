import React from "react";
import styles from "./index.module.css";
import CommonSearch from "@sub/search";
import Tag from "./tag";

function Home() {
  return (
    <div className={styles.homePage}>
      <CommonSearch />
      <h1> Videos</h1>
      <div className={styles.tagContent}>
        {["All Sports", "Football", "Cricket", "Netball", "Boxing"].map(
          (tag) => (
            <Tag> {tag} </Tag>
          )
        )}
      </div>
    </div>
  );
}

export default Home;
