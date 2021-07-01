import React from "react";
import Link from "next/link";
import ThrashSVG from "@svg/thrash";
import EditSVG from "@svg/edit";
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

function ReplyActions({ dateTime, isAuthor, deleteBtnAction }) {
  return (
    <div className={styles.replyActions}>
      {isAuthor && (
        <>
          <span>
            <EditSVG></EditSVG>
          </span>

          {deleteBtnAction && (
            <span onClick={deleteBtnAction}>
              <ThrashSVG></ThrashSVG>
            </span>
          )}
        </>
      )}
      <span>{new Date(dateTime).toLocaleString()}</span>
    </div>
  );
}

function Replies({ reply, isAuthor, onDeleteReplyClick }) {
  return (
    <div className={styles.replyBoxWrapper}>
      <ReplyInfo author={reply?.user?.profile}></ReplyInfo>
      <div className={styles.replyContent}>
        <ReplyBody
          author={reply?.user?.profile}
          replyText={reply?.text}
        ></ReplyBody>
        <ReplyActions
          dateTime={reply?.dateTime}
          isAuthor={isAuthor}
          deleteBtnAction={isAuthor ? () => onDeleteReplyClick() : null}
        ></ReplyActions>
      </div>
    </div>
  );
}

export default Replies;
