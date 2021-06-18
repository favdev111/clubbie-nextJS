import React from "react";
import styles from "./index.module.css";

import Comment from "@svg/social/comment";
import Fav from "@svg/social/fav";
import Repost from "@svg/social/repost";
import Send from "@svg/social/send";
import Upload from "@svg/social/upload";

function SocialButton({ type, children }) {
  return (
    <div className={styles.socialButton}>
      {type == "repost" && <Repost />}
      {type == "fav" && <Fav />}
      {type == "comment" && <Comment />}
      {type == "upload" && <Upload />}
      {type == "send" && <Send />}

      {children && <p className="opacity-50"> {children}</p>}
    </div>
  );
}

export default SocialButton;
