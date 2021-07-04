import React, { useState, useEffect } from "react";
import BackForward from "./back-forward";
import RecentVideoCard from "./video-card";
import styles from "./index.module.css";

function RecentVideos({ data }) {
  const [paginationData, setPaginationData] = useState();
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    pageIndex == 0 && setPaginationData(data.slice(0, 2));
    pageIndex == 1 && setPaginationData(data.slice(2, 4));
    pageIndex == 2 && setPaginationData(data.slice(4, 6));
  }, [pageIndex]);

  return (
    <div className={styles.recent}>
      <div className={styles.recentHeader}>
        <h3> Recent Videos</h3>
        {/* Buttons */}
        <BackForward
          length={data?.length}
          index={pageIndex}
          setIndex={setPageIndex}
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
