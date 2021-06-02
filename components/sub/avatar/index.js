import React from "react";

function Avatar({ src, className }) {
  return (
    <>
      <img className={className} src={src} />
    </>
  );
}

export default Avatar;
