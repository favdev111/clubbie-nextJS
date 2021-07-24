import React, { useState } from "react";
import Link from "next/link";
import TemplateInput from "@sub/input";
import ConfirmDialog from "@sub/confirm-dialog";
import TimeAgo from "@sub/time-ago";
import ThrashSVG from "@svg/thrash";
import EditSVG from "@svg/edit";
import SaveSVG from "@svg/save";
import styles from "./reply.module.css";

function ReplyInfo({ author }) {
  return (
    <div className={styles.replyInfo}>
      <Link href={`/profile/${author?.id}`}>
        <a>
          <img src={author?.image || "/assets/person-placeholder.jpg"} />
        </a>
      </Link>
    </div>
  );
}

function ReplyBody({ author, replyText, onSaveClick, loading }) {
  const [editText, setEditText] = useState(replyText);

  return (
    <div className={styles.replyBody}>
      <Link href={`/profile/${author?.id}`}>
        <a>
          <span className="text-18" className={styles.replyAuthorName}>
            {author?.fullName || author?.id}
          </span>
        </a>
      </Link>
      {!onSaveClick ? (
        <p className={styles.replyText}>{replyText}</p>
      ) : (
        <div className={styles.editReplyWrapper}>
          <TemplateInput
            name="editReply"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onEnter={(e) => !loading && onSaveClick(editText)}
          />
          <div className={styles.saveReply}>
            <span onClick={() => onSaveClick(editText)}>
              <SaveSVG></SaveSVG>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function ReplyActions({
  dateTime,
  isAuthor,
  editButtonAction,
  deleteBtnAction,
}) {
  const [confirmAndDelete, setConfirmAndDelete] = useState(false);

  return (
    <>
      <ConfirmDialog
        message="Are You Sure To Delete This Reply?"
        confirmText={"Delete"}
        onConfirm={() => {
          deleteBtnAction();
        }}
        open={confirmAndDelete}
        setOpen={setConfirmAndDelete}
      ></ConfirmDialog>
      <div className={styles.replyActions}>
        {isAuthor && (
          <>
            {editButtonAction && (
              <span onClick={editButtonAction}>
                <EditSVG></EditSVG>
              </span>
            )}

            {deleteBtnAction && (
              <span onClick={() => setConfirmAndDelete(true)}>
                <ThrashSVG></ThrashSVG>
              </span>
            )}
          </>
        )}
        <span>
          <TimeAgo date={dateTime}></TimeAgo>
        </span>
      </div>
    </>
  );
}

function Replies({
  reply,
  isAuthor,
  onDeleteReplyClick,
  editingReply,
  onSaveReplyClick,
}) {
  const [editMode, setEditMode] = useState(false);

  const saveReply = (replyText) => {
    if (replyText.trim().length === 0) return;
    setEditMode(false);
    onSaveReplyClick(reply?._id || reply?.id, replyText);
  };

  return (
    <div className={styles.replyBoxWrapper}>
      <ReplyInfo
        author={{ ...reply?.user?.profile, id: reply?.user?.id }}
      ></ReplyInfo>
      <div className={styles.replyContent}>
        <ReplyBody
          author={{ ...reply?.user?.profile, id: reply?.user?.id }}
          replyText={reply?.text}
          onSaveClick={editMode ? saveReply : null}
          loading={editingReply}
        ></ReplyBody>
        <ReplyActions
          dateTime={reply?.dateTime}
          isAuthor={isAuthor}
          editButtonAction={() => setEditMode(!editMode)}
          deleteBtnAction={isAuthor ? () => onDeleteReplyClick() : null}
        ></ReplyActions>
      </div>
    </div>
  );
}

export default Replies;
