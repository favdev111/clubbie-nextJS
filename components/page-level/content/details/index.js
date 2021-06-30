import React, { useState } from "react";
import cn from "classnames";
import router from "next/router";
import Link from "next/link";
import ActionButton from "@sub/action-button";
import SocialButton from "@sub/social-button";
import Chip from "@sub/chip";
import ConfirmDialog from "@sub/confirm-dialog";
import Loader from "@sub/loader";
import BackDropLoader from "@sub/backdrop-loader";
import Posts from "@api/services/Posts";
import Comments from "@api/services/Comments";
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
      alert("Error Deleting Post"); // TODO: make queueable notification snack
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

function ContentComments({ user, comments, contentId }) {
  const [_comments, setComments] = useState(comments);
  const [loadingComments, setLoadingComments] = useState(false);
  const [creatingComment, setCreatingComment] = useState(false);
  const [editingComment, setEditingComment] = useState(false);
  const [deletingComment, setDeletingComment] = useState(false);

  const loadMoreComments = async () => {
    setLoadingComments(true);

    // get comments
    const responsePostComments = await Comments.GetComments(contentId, {
      limit: 10,
      page: _comments?.page + 1,
      sortBy: "dateTime:desc",
    }).catch(() => false);
    const moreComments = responsePostComments?.data;
    if (!moreComments) {
      console.log("error loading comments"); // Todo: error component
      setLoadingComments(false);
      return;
    }

    // set in state
    const commentsToSet = {
      ...moreComments,
      results: [...(_comments?.results || []), ...moreComments?.results],
    };
    setComments({ ...commentsToSet });

    setLoadingComments(false);
  };

  const createComment = async (commentText) => {
    if (commentText.trim().length === 0) return;
    setCreatingComment(true);

    // create comment
    const payload = { text: commentText.trim() };
    const response = await Comments.CreateComment(contentId, payload).catch(
      () => false
    );
    const createdComment = response?.data;
    if (!createdComment) {
      console.log("error creating comments"); // Todo: error component
      setCreatingComment(false);
      return;
    }

    // set in state
    const commentsToSet = {
      ..._comments,
      results: [{ ...createdComment, user: user }, ..._comments?.results],
    };
    setComments({ ...commentsToSet });

    setCreatingComment(false);
  };

  const editComment = async (commentId, commentText) => {
    if (!commentId || !commentText) return;
    setEditingComment(true);

    // edit comment
    const payload = { text: commentText.trim() };
    const response = await Comments.UpdateComment(commentId, payload).catch(
      () => false
    );
    const editedComment = response?.data;
    if (!editedComment) {
      console.log("Comment Not Edited"); // Todo: error component
      setEditingComment(false);
      return;
    }

    // find and update comment
    const updatedCommentState = _comments.results;
    const commentToUpdate = updatedCommentState.find(
      (x) => x?.id === commentId
    );
    commentToUpdate.text = editedComment?.text;

    // update state
    const commentsToSet = {
      ..._comments,
      results: updatedCommentState,
    };
    setComments({ ...commentsToSet });

    setEditingComment(false);
  };

  const deleteComment = async (commentId) => {
    if (!commentId) return;
    setDeletingComment(true);

    // delete comment
    const response = await Comments.DeleteComment(commentId).catch(() => false);
    const deleted = response?.status === 204;
    if (!deleted) {
      console.log("Comment Not Deleted"); // Todo: error component
      setDeletingComment(false);
      return;
    }

    // filter from state
    const commentsToSet = {
      ..._comments,
      results: _comments.results.filter((x) => x.id !== commentId),
    };
    setComments({ ...commentsToSet });

    setDeletingComment(false);
  };

  return (
    <div className={styles.commentsWrapper}>
      <h2>Comments</h2>
      <CommentInput
        placeholder={"Type your comment here..."}
        buttonText={"Comment"}
        loading={creatingComment}
        onSubmit={(comment) => createComment(comment)}
      ></CommentInput>
      {_comments?.results.map((comment, index) => (
        <Comment
          key={index}
          comment={comment}
          replies={comment?.replies}
          isAuthor={user?.id === comment?.user?.id}
          onDeleteClick={deleteComment}
          onSaveClick={editComment}
          editingComment={editingComment}
        ></Comment>
      ))}
      {_comments?.page < _comments?.totalPages && (
        <div className={styles.commentsLoadMoreWrapper}>
          <span
            className={styles.commentsLoadMoreButton}
            onClick={() => loadMoreComments()}
          >
            Load More
            {loadingComments && (
              <span className={styles.loader}>
                <Loader></Loader>
              </span>
            )}
          </span>
        </div>
      )}
      {(editingComment || deletingComment) && <BackDropLoader></BackDropLoader>}
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
        <ContentComments
          user={user}
          comments={content.comments}
          contentId={content?.id}
        ></ContentComments>
      )}
    </>
  );
}

export default ContentDetails;
