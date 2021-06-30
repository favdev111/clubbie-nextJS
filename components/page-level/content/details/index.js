import React, { useState } from "react";
import cn from "classnames";
import router from "next/router";
import Link from "next/link";
import ActionButton from "@sub/action-button";
import SocialButton from "@sub/social-button";
import Chip from "@sub/chip";
import ConfirmDialog from "@sub/confirm-dialog";
import Posts from "@api/services/Posts";
import CommentInput from "./commentInput";
import Comment from "./comment";
import styles from "./contentDetails.module.css";

function ContentMediaTag({ media, className, videoControls }) {
  return (
    <>
      {media?.includes("video") && (
        <video
          className={className}
          src={media}
          controls={videoControls}
        ></video>
      )}
      {media?.includes("image") && <img className={className} src={media} />}
    </>
  );
}

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
              <ActionButton
                type="edit"
                onClick={() => router.push(`/content/${contentId}/edit`)}
              />
            </>
          )}
          <SocialButton type="upload" />
        </span>
      </div>
    </>
  );
}

function ContentMedia({ media }) {
  return (
    <div className={styles.contentMediaWrapper}>
      <ContentMediaTag
        media={media}
        className={styles.contentMedia}
        videoControls
      />
    </div>
  );
}

function ContentRelatedMedia({
  parentMedia,
  relatedMediaItems,
  activeMedia,
  setActiveMedia,
}) {
  return (
    <div className={styles.contentRelatedMediaWrapper}>
      <span onClick={() => setActiveMedia(parentMedia)}>
        <ContentMediaTag
          media={parentMedia}
          className={cn(
            styles.contentRelatedMedia,
            activeMedia === parentMedia && styles.activeRelatedMedia
          )}
        />
      </span>
      {relatedMediaItems.map((x) => (
        <span onClick={() => setActiveMedia(x.media)}>
          <ContentMediaTag
            media={x?.media}
            className={cn(
              styles.contentRelatedMedia,
              activeMedia === x.media && styles.activeRelatedMedia
            )}
          />
        </span>
      ))}
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
  const [activeMedia, setActiveMedia] = useState(content?.media);

  return (
    <>
      <ContentHeader
        contentId={content?.id}
        author={content?.author}
        isMyPost={content?.author?.id === user?.id}
      ></ContentHeader>
      <ContentMedia media={activeMedia}></ContentMedia>
      {content?.childPosts.length > 0 && (
        <ContentRelatedMedia
          parentMedia={content?.media}
          relatedMediaItems={content?.childPosts}
          activeMedia={activeMedia}
          setActiveMedia={setActiveMedia}
        ></ContentRelatedMedia>
      )}
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
