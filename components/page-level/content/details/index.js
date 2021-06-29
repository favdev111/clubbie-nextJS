import React, { useState } from "react";
import router from "next/router";
import Link from "next/link";
import ActionButton from "@sub/action-button";
import SocialButton from "@sub/social-button";
import Chip from "@sub/chip";
import ConfirmDialog from "@sub/confirm-dialog";
import CommentInput from "./commentInput";
import Comment from "./comment";
import Posts from "@api/services/Posts";
import styles from "./contentDetails.module.css";

function ContentHeader({ contentId, author, isMyPost }) {
  const [openDialog, setOpenDialog] = useState(false);

  const deleteContent = async (contentId) => {
    const response = await Posts.DeletePost(contentId).catch(() => undefined);
    if (response?.status !== 204) {
      alert("Error Deleting Post"); // TODO: make queable notification snack
      return;
    }
    alert("Content Deleted Successfully");
    router.push("/"); // Goto Home Page
  };

  return (
    <>
      <ConfirmDialog
        message="Are You Sure To Delete This Post?"
        confirmText={"Delete"}
        onConfirm={() => {
          deleteContent(contentId);
        }}
        open={openDialog}
        setOpen={setOpenDialog}
      ></ConfirmDialog>
      <div className={styles.postHeader}>
        <div className={styles.postAuthorProfile}>
          <img src={author?.image || "/assets/person-placeholder.jpg"} />
          <div className={styles.postAuthorInfo}>
            <Link href={`/profile/${author?.id}`}>
              <p className="text-18" className={styles.postAuthorName}>
                {author?.name || author?.id}
              </p>
            </Link>
            {author?.playerTitle && (
              <p className="opacity-50">{author?.playerTitle}</p>
            )}
          </div>
        </div>
        <span className={styles.postHeaderButtons}>
          {isMyPost && (
            <>
              <ActionButton type="delete" onClick={() => setOpenDialog(true)} />
              <ActionButton type="edit" />
            </>
          )}
          <SocialButton type="upload" />
        </span>
      </div>
    </>
  );
}

function ContentMedia({ contentType, media }) {
  return (
    <div className={styles.contentMediaWrapper}>
      {contentType === "video" && (
        <video className={styles.contentMedia} src={media} controls />
      )}
      {contentType === "image" && (
        <img className={styles.contentMedia} src={media} />
      )}
    </div>
  );
}

function ContentBody({ title, description, createdAt, views }) {
  return (
    <div>
      <div className={styles.contentBody}>
        <div className={styles.contentTitle}>
          <h1>{title}</h1>
          <div className={styles.contentDateTime}>
            <Chip text={new Date(createdAt).toLocaleString()}></Chip>
          </div>
        </div>
        <span className={styles.contentViews}>
          {/* TODO: remove the + 1 after ui */}
          {views + 1 ? `${views} View${views > 1 || views < 1 ? "s" : ""}` : ""}
        </span>
      </div>

      <span>{description}</span>
    </div>
  );
}

function ContentActions({ totalLikes, totalReposts }) {
  return (
    <div>
      <div className={styles.contentActionButtons}>
        <SocialButton type="fav">{totalLikes}</SocialButton>
        <SocialButton type="repost">{totalReposts}</SocialButton>
        <SocialButton type="send" />
      </div>
    </div>
  );
}

function ContentComments({ comments }) {
  return (
    <div className={styles.commentsWrapper}>
      <h2>Comments</h2>
      <CommentInput
        placeholder={"Type your comment here..."}
        buttonText={"Comment"}
      ></CommentInput>
      {comments?.results.map((comment, index) => (
        <Comment
          key={index}
          comment={comment}
          replies={comment?.replies}
        ></Comment>
      ))}
    </div>
  );
}

function ContentDetails({ content, user }) {
  return (
    <>
      <ContentHeader
        contentId={content?.id}
        author={content?.author}
        isMyPost={content?.author?.id === user?.id}
      ></ContentHeader>
      <ContentMedia
        contentType={content?.contentType}
        media={content?.media}
      ></ContentMedia>
      <ContentBody
        title={content.title}
        description={content.description}
        createdAt={content.createdAt}
        views={content.views}
      ></ContentBody>
      <ContentActions
        totalLikes={content?.likes}
        totalReposts={content?.reposts}
      ></ContentActions>
      {content?.comments?.results && (
        <ContentComments comments={content.comments}></ContentComments>
      )}
    </>
  );
}

export default ContentDetails;
