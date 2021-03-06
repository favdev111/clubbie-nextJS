import React from "react";
import Link from "next/link";
import Posts from "@api/services/Posts";
import ContentForm from "../common/form";
import router from "next/router";
import { updatePost } from "@utils/schemas/post.schema";
import styles from "./editContent.module.css";

function TeamHeader({ teamId, teamTitle }) {
  return (
    <div className={styles.editContentTeamHeader}>
      Edit post in{" "}
      <Link href={`/teams/${teamId}`}>
        <a>
          <span className={styles.editContentTeamName}>{teamTitle}</span>
        </a>
      </Link>
    </div>
  );
}

function ContentEdit({ content, team }) {
  const handleOnSubmit = async ({
    _media,
    _caption,
    _sport,
    _tags,
    _relatedMediaItems,
    uploadMultiplePostMedia,
    setStatus,
    deleteChildPosts,
  }) => {
    const tagType = (str) => {
      const _str = str
        ?.split(" ")
        ?.map((w) => w[0]?.toUpperCase() + w?.substr(1)?.toLowerCase())
        ?.join("")
        ?.trim();
      return _str.charAt(0).toLowerCase() + _str.slice(1);
    };

    // Common Body for parent and child post
    const tags = (() => {
      const _tempTags = _tags?.map((x) => {
        return {
          type: tagType(x?.text),
          value: x?.text,
        };
      });
      if (_sport) {
        _tempTags?.push({
          type: _sport.trim(),
          value: _sport.trim(),
        });
      }
      return _tempTags || null;
    })();

    const commonBody = {
      title: _caption?.trim(),
      // description: _description?.trim(),
      tags,
    };

    // delete all related media if any
    if (deleteChildPosts.length > 0) {
      const deletedPosts = await Posts.RemoveChildPost(
        content?.id,
        deleteChildPosts
      ).catch(() => null);
      if (!deletedPosts) {
        setStatus({
          loading: false,
          msg: "Error Removing Related Media",
          type: "error",
        });
        return;
      }
    }

    // upload all media if any
    const parentMedia = await (async () => {
      let uploadedMedia;
      if (_media?.src) {
        uploadedMedia = (await uploadMultiplePostMedia([_media]))[0] || null;
      }
      return uploadedMedia?.media || _media;
    })();
    if (!parentMedia) {
      setStatus({
        loading: false,
        msg: "Error Uploading Media",
        type: "error",
      });
      return;
    }
    const relatedMedia = await (async () => {
      let uploadedItems = false;
      let toUpload = _relatedMediaItems?.filter((x) => x?.src) || null;
      if (toUpload?.length > 0) {
        uploadedItems =
          (await uploadMultiplePostMedia(_relatedMediaItems)) || false;
      }
      return uploadedItems || null;
    })();
    if (relatedMedia === false) {
      setStatus({
        loading: false,
        msg: "Error Uploading Media",
        type: "error",
      });
      return;
    }

    // Edit Parent Post
    const parentPost = await (async () => {
      const body = {
        ...commonBody,
        media: parentMedia,
        thumbnail: parentMedia?.includes("image") ? null : parentMedia,
      };
      const payload = Object.fromEntries(
        Object.entries(body).filter(([_, v]) => v != null)
      );
      const _post = await Posts.UpdatePostbyId(content?.id, payload).catch(
        (e) => undefined
      );

      return _post?.data;
    })();
    if (!parentPost) {
      setStatus({
        loading: false,
        msg: "Error Updating Post",
        type: "error",
      });
      return;
    }

    // Append child posts if any
    if (relatedMedia?.length > 0) {
      const childPostsBody = (() => {
        return relatedMedia.map((item) => {
          const _body = {
            media: item?.media,
            thumbnail: item?.contentType === "image" ? null : item?.media,
            contentType: item?.contentType,
          };
          return Object.fromEntries(
            Object.entries(_body).filter(([_, v]) => v != null)
          );
        });
      })();

      if (childPostsBody.length > 0) {
        const appendedPost = await Posts.AppendChildPost(parentPost?.id, {
          childPosts: childPostsBody,
        }).catch(() => undefined);
        if (!appendedPost) {
          setStatus({
            loading: false,
            msg: "Error Updating Post",
            type: "error",
          });
          return;
        }
      }
    }

    setStatus({
      loading: false,
      msg: "Post Edited Successfully.",
      type: "success",
    });

    router.push(
      `/content/${parentPost.id}${team?.id ? `\?teamId=${team?.id}` : ""}`
    );
  };

  return (
    <>
      {team && <TeamHeader teamId={team?.id} teamTitle={team?.title} />}
      <ContentForm
        actionText="Edit"
        onSubmitForm={handleOnSubmit}
        contentId={content?.id}
        media={content?.media}
        caption={content?.title}
        description={content?.description}
        relatedMediaItems={content?.childPosts}
        sport={content?.tags[0]?.type || null}
        tags={
          content?.tags.length > 0
            ? content?.tags.map((x) => x.value).join()
            : null
        }
        validationSchema={updatePost}
      ></ContentForm>
    </>
  );
}

export default ContentEdit;
