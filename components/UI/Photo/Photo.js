import React from "react";

function Photo({ src }) {
  return (
    <>
      <img src={require(`${src}`)} />
    </>
  );
}

export default Photo;
