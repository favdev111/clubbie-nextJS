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
        <div className={styles.tagInner}>
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

        <div className={styles.sortSelect}>
          <select name="sort" id="sort">
            <option value="recent">Recent</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>

      <div className={styles.addContent}>
        <div className={styles.addButton}>
          <img src="/assets/plus-turk.svg" />
          Add Content
        </div>
      </div>

      {/* Posts here */}
    </div>
  );
}

export default Home;
