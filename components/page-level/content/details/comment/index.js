import React, { useState } from "react";
import Link from "next/link";
import FavSVG from "@svg/social/fav";
import CommentSVG from "@svg/social/comment";
import styles from "./comments.module.css";
import Reply from "./reply";
import CommentInput from "../commentInput";

function CommentInfo({ author }) {
  return (
    <div className={styles.commentInfo}>
      <Link href={`/profile/${author?.id}`}>
        <img src={author?.image || "/assets/person-placeholder.jpg"} />
      </Link>
    </div>
  );
}

function CommentBody({ author, commentText }) {
  return (
    <div className={styles.commentBody}>
      <Link href={`/profile/${author?.id}`}>
        <span className="text-18" className={styles.commentAuthorName}>
          {author?.profile?.fullName || author?.id}
        </span>
      </Link>
      <p className={styles.commentText}>{commentText}t</p>
    </div>
  );
}

// todo: update when api done
function CommentActions({
  hasLiked,
  hasCommented,
  likeBtnAction,
  commentBtnAction,
  dateTime,
}) {
  return (
    <div className={styles.commentActions}>
      <span onClick={likeBtnAction} className={hasLiked && styles.hasLiked}>
        <FavSVG></FavSVG>
      </span>
      <span
        onClick={commentBtnAction}
        className={hasCommented && styles.hasCommented}
      >
        <CommentSVG></CommentSVG>
      </span>
      <span>{new Date(dateTime).toLocaleString()}</span>
    </div>
  );
}

function Comment({ comment, replies }) {
  const [addReply, setAddReply] = useState(false);

  return (
    <div className={styles.commentBoxWrapper}>
      <CommentInfo author={comment?.user}></CommentInfo>
      <div className={styles.commentContent}>
        <CommentBody
          author={comment?.user}
          commentText={comment?.text}
        ></CommentBody>
        {/* Todo: action buttons api logic */}
        <CommentActions
          likeBtnAction={() => console.log("like clicked")}
          commentBtnAction={() => setAddReply(!addReply)}
          dateTime={comment?.dateTime}
        ></CommentActions>
        {addReply && (
          <div className={styles.addReply}>
            <CommentInput
              placeholder={"Type your reply..."}
              buttonText={"Reply"}
            ></CommentInput>
          </div>
        )}
        {replies.map((reply) => (
          <Reply reply={reply}></Reply>
        ))}
      </div>
    </div>
  );
}

export default Comment;
