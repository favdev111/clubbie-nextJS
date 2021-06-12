import React from "react";
import BackForward from "./back-forward";
import RecentVideoCard from "./video-card";
import styles from "./index.module.css";

function RecentVideos() {
  return (
    <div className={styles.recent}>
      <div className={styles.recentHeader}>
        <h3> Recent Videos</h3>
        {/* Buttons */}
        <BackForward />
      </div>
      {/* Recents */}
      <div className={styles.recentVideos}>
        <RecentVideoCard />
        <RecentVideoCard />
      </div>
    </div>
  );
}

export default RecentVideos;
