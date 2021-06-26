import React, { useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import CommonSearch from "@sub/search";
import HomeVideosCard from "./card";
import Tag from "./tag";
import PlusTurk from "@svg/plus-turk";
import YouShouldSignUp from "@sub/sign-up-warn";

function Home({ posts }) {
  const [activeTag, setActiveTag] = useState(0);

  return (
    <div className={styles.homePage}>
      <YouShouldSignUp open />
      <div className={styles.search}>
        <CommonSearch />
      </div>
      <h1 className={styles.title}> Videos</h1>
      <div className={styles.mobileSort}>
        <span> Recent </span>
        <span> Following </span>
        <span> Ranking </span>
      </div>
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
            <option value="popular">Following</option>
            <option value="Ranking">Ranking</option>
          </select>
        </div>
      </div>

      <Link href="/content">
        <a>
          <div className={styles.addContent}>
            <div className={styles.addButton}>
              <a>
                <PlusTurk />
              </a>
              Add Content
            </div>
          </div>
        </a>
      </Link>

      {posts.map((post, index) => (
        <HomeVideosCard key={post + index} data={post} />
      ))}
    </div>
  );
}

export default Home;
