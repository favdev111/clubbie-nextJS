import React, { useState } from "react";
import styles from "./index.module.css";
import CommonSearch from "@sub/search";
import Tag from "./tag";

function Home() {
  const [activeTag, setActiveTag] = useState(0);

  return (
    <div className={styles.homePage}>
      <CommonSearch />
      <h1> Videos</h1>
      <div className={styles.tagContent}>
        {["All Sports", "Football", "Cricket", "Netball", "Boxing"].map(
          (tag, index) => (
            <Tag
              activeTag={activeTag}
              onClick={() => setActiveTag(index)}
              index={index}
              key={tag + index}
            >
              {tag}
            </Tag>
          )
        )}
      </div>
    </div>
  );
}

export default Home;
