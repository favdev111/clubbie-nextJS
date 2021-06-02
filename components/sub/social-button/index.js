import React from "react";
import styles from "./index.module.css";

function SocialButton({ type, children }) {
  return (
    <div className={styles.socialButton}>
      {type == "repost" && <img src="/assets/home-repost.svg" />}
      {type == "fav" && <img src="/assets/home-fav.svg" />}
      {type == "comment" && <img src="/assets/home-comment.svg" />}
      {type == "upload" && <img src="/assets/home-upload.svg" />}
      {type == "send" && <img src="/assets/home-send.svg" />}

      {children && <p className="opacity-50"> {children}</p>}
    </div>
  );
}

export default SocialButton;
