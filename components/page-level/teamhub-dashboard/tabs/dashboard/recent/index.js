import React, { useState, useEffect } from "react";
import BackForward from "./back-forward";
import RecentVideoCard from "./video-card";
import styles from "./index.module.css";

function RecentVideos({ data }) {
  const [paginationData, setPaginationData] = useState();
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    data.length > 2 && setPaginationData(data.slice(0, 2));
  }, [data]);

  return (
    <div className={styles.recent}>
      <div className={styles.recentHeader}>
        <h3> Recent Videos</h3>
        {/* Buttons */}
        <BackForward
          length={data?.length}
          index={pageIndex}
          setIndex={pageIndex}
        />
      </div>
      {/* Recents */}
      <div className={styles.recentVideos}>
        {paginationData?.map((video, index) => (
          <RecentVideoCard
            key={index + "videosOnDashboard"}
            videoSrc={video.media}
          />
        ))}
      </div>
    </div>
  );
}

export default RecentVideos;
