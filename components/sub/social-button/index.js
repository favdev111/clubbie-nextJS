import React from "react";

function SocialButton({ type, children }) {
  return (
    <div>
      {type == "repost" && <img src="/assets/home-repost.svg" />}
      {type == "fav" && <img src="/assets/home-fav.svg" />}
      {type == "comment" && <img src="/assets/home-comment.svg" />}
      {type == "upload" && <img src="/assets/home-upload.svg" />}
      {type == "send" && <img src="/assets/home-send.svg" />}

      {children && <p> {children}</p>}
    </div>
  );
}

export default SocialButton;
