import React, { useState, useRef, useCallback } from "react";
import styles from "./infiniteScroll.module.css";

function InfiniteScroll({
  dataLength,
  getMore,
  hasMore,
  loader,
  children,
  endingMessage,
}) {
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    await getMore();
    setLoading(false);
  };

  // Observer pattern with callback
  const observer = useRef();
  const endOfPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      {children}
      {loading && loader}
      {!loading && !hasMore && endingMessage}
      <div ref={endOfPostRef}>
        {/* Ref wont work on empty divs */}
        <div className={styles.scrollEnd}>
          <h2>Clubbie</h2>
        </div>
      </div>
    </>
  );
}

export default InfiniteScroll;
