import React from "react";
import _InfiniteScrollComp from "react-infinite-scroll-component";

function InfiniteScroll({
  dataLength,
  getMore,
  hasMore,
  loading,
  children,
  endingMessage,
}) {
  return (
    <_InfiniteScrollComp
      dataLength={dataLength}
      next={getMore}
      hasMore={hasMore}
      loader={loading}
      endMessage={endingMessage}
    >
      {children}
    </_InfiniteScrollComp>
  );
}

export default InfiniteScroll;
