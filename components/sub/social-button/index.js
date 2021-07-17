import React from "react";
import cn from "classnames";
import styles from "./index.module.css";

import Comment from "@svg/social/comment";
import Fav from "@svg/social/fav";
import Repost from "@svg/social/repost";
import Send from "@svg/social/send";
import Upload from "@svg/social/upload";

function SocialButton({ type, children, highlight, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(styles.socialButton, highlight && styles.highlight)}
    >
      {type == "repost" && <Repost strokeColor={highlight && "white"} />}
      {type == "fav" && <Fav strokeColor={highlight && "white"} />}
      {type == "comment" && <Comment strokeColor={highlight && "white"} />}
      {type == "upload" && <Upload strokeColor={highlight && "white"} />}
      {type == "send" && <Send strokeColor={highlight && "white"} />}

      {children && <p className="opacity-50"> {children}</p>}
    </div>
  );
}

export default SocialButton;
