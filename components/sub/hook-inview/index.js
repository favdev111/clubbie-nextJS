import React, { useRef, useCallback } from "react";

function Inview({ onVisiable, onHidden, children }) {
  // Observer pattern with callback
  const observer = useRef();
  const inView = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onVisiable();
      } else {
        onHidden();
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return <div ref={inView}>{children}</div>;
}

export default Inview;
