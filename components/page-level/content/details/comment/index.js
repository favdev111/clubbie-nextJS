import React, { useState } from "react";
import Link from "next/link";
import TemplateInput from "@sub/input";
import FavSVG from "@svg/social/fav";
import CommentSVG from "@svg/social/comment";
import ThrashSVG from "@svg/thrash";
import EditSVG from "@svg/edit";
import SaveSVG from "@svg/save";
import styles from "./comments.module.css";
import Reply from "./reply";
import CommentInput from "../commentInput";

function CommentInfo({ author }) {
  return (
    <div className={styles.commentInfo}>
      <Link href={`/profile/${author?.id}`}>
        <img src={author?.profile?.image || "/assets/person-placeholder.jpg"} />
      </Link>
    </div>
  );
}

function CommentBody({ author, commentText, onSaveClick, loading }) {
  const [editText, setEditText] = useState(commentText);

  return (
    <div className={styles.commentBody}>
      <Link href={`/profile/${author?.id}`}>
        <span className="text-18" className={styles.commentAuthorName}>
          {author?.profile?.fullName || author?.id}
        </span>
      </Link>
      {!onSaveClick ? (
        <p className={styles.commentText}>{commentText}</p>
      ) : (
        <div className={styles.editCommentWrapper}>
          <TemplateInput
            name="editComment"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onEnter={(e) => !loading && onSaveClick(editText)}
          />
          <div className={styles.saveComment}>
            <span onClick={() => onSaveClick(editText)}>
              <SaveSVG></SaveSVG>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// todo: update when api done
function CommentActions({
  hasLiked,
  hasCommented,
  likeBtnAction,
  commentBtnAction,
  editBtnAction,
  deleteBtnAction,
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
      {editBtnAction && (
        <span onClick={editBtnAction}>
          <EditSVG></EditSVG>
        </span>
      )}
      {deleteBtnAction && (
        <span onClick={deleteBtnAction}>
          <ThrashSVG></ThrashSVG>
        </span>
      )}
      <span>{new Date(dateTime).toLocaleString()}</span>
    </div>
  );
}

function Comment({
  comment,
  replies,
  isAuthor,
  onDeleteCommentClick,
  onSaveCommentClick,
  editingComment,
  onCreateReply,
  creatingReply,
}) {
  const [addReply, setAddReply] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const saveComment = (commentText) => {
    if (commentText.trim().length === 0) return;
    setEditMode(false);
    onSaveCommentClick(comment?.id, commentText);
  };

  const createCommentReply = async (reply) => {
    await onCreateReply(comment?.id, reply);
    setAddReply(false);
  };

  return (
    <div className={styles.commentBoxWrapper}>
      <CommentInfo author={comment?.user}></CommentInfo>
      <div className={styles.commentContent}>
        <CommentBody
          author={comment?.user}
          commentText={comment?.text}
          onSaveClick={editMode ? saveComment : null}
          loading={editingComment}
        ></CommentBody>
        {/* Todo: action buttons api logic */}
        <CommentActions
          likeBtnAction={() => console.log("like clicked")}
          commentBtnAction={() => setAddReply(!addReply)}
          editBtnAction={() => setEditMode(!editMode)}
          deleteBtnAction={
            isAuthor ? () => onDeleteCommentClick(comment?.id) : null
          }
          dateTime={comment?.dateTime}
        ></CommentActions>
        {addReply && (
          <div className={styles.addReply}>
            <CommentInput
              placeholder={"Type your reply..."}
              buttonText={"Reply"}
              loading={creatingReply}
              onSubmit={createCommentReply}
            ></CommentInput>
          </div>
        )}
        {replies.map((reply, index) => (
          <Reply key={index} reply={reply}></Reply>
        ))}
      </div>
    </div>
  );
}

export default Comment;
