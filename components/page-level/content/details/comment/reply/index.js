import React from "react";
import Link from "next/link";
import styles from "./reply.module.css";

function ReplyInfo({ author }) {
  return (
    <div className={styles.replyInfo}>
      <Link href={`/profile/${author?.id}`}>
        <img src={author?.image || "/assets/person-placeholder.jpg"} />
      </Link>
    </div>
  );
}

function ReplyBody({ author, replyText }) {
  return (
    <div className={styles.replyBody}>
      <Link href={`/profile/${author?.id}`}>
        <span className="text-18" className={styles.replyAuthorName}>
          {author?.fullName || author?.id}
        </span>
      </Link>
      <p className={styles.replyText}>{replyText}</p>
    </div>
  );
}

function Replies({ reply }) {
  return (
    <div className={styles.replyBoxWrapper}>
      <ReplyInfo author={reply?.user?.profile}></ReplyInfo>
      <div className={styles.replyContent}>
        <ReplyBody
          author={reply?.user?.profile}
          replyText={reply?.text}
        ></ReplyBody>
      </div>
    </div>
  );
}

export default Replies;
