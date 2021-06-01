import React from "react";

function SocialButton({ type, children }) {
  return (
    <div>
      <img
        src={type == "fav" && "/assets/home-fav.svg"}
        src={type == "repost" && "/assets/home-repost.svg"}
        src={type == "comment" && "/assets/home-comment.svg"}
        src={type == "upload" && "/assets/home-upload.svg"}
        src={type == "send" && "/assets/home-send.svg"}
      />
      {children && <p> {children}</p>}
    </div>
  );
}

export default SocialButton;
