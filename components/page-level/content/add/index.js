import React from "react";
import Posts from "@api/services/Posts";
import ContentForm from "../common/form";
import router from "next/router";
import { createPost } from "@utils/schemas/post.schema";

function ContentAdd() {
  const handleOnSubmit = async ({
    _media,
    _caption,
    _description,
    _sport,
    _tags,
    _relatedMediaItems,
    uploadMultiplePostMedia,
    setStatus,
    deleteChildPosts = null,
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
    const commonBody = {
      title: _caption?.trim(),
      description: _description?.trim() || null,
      tags: (() => {
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
      })(),
    };

    // upload files
    const parentMedia = (await uploadMultiplePostMedia([_media]))[0] || null;
    if (!parentMedia) {
      setStatus({
        loading: false,
        msg: "Error Uploading Media",
        type: "error",
      });
      return;
    }
    let relatedMedia = null;
    if (_relatedMediaItems.length >= 0) {
      relatedMedia = await uploadMultiplePostMedia(_relatedMediaItems);
      relatedMedia = relatedMedia.filter((x) => x);
      if (relatedMedia.length !== _relatedMediaItems.length) {
        setStatus({
          loading: false,
          msg: "Error Uploading Media",
          type: "error",
        });
        return;
      }
    }

    // Make Parent Post
    const parentPost = await (async () => {
      const body = {
        ...commonBody,
        media: parentMedia?.media,
        thumbnail:
          parentMedia?.contentType === "image" ? null : parentMedia?.media,
        contentType: parentMedia?.contentType,
      };
      const payload = Object.fromEntries(
        Object.entries(body).filter(([_, v]) => v != null)
      );
      const _post = await Posts.CreatePost(payload).catch((e) => undefined);

      return _post?.data;
    })();
    if (!parentPost) {
      setStatus({
        loading: false,
        msg: "Error Creating Post",
        type: "error",
      });
      return;
    }

    // Append child posts
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

    if (relatedMedia && childPostsBody.length > 0) {
      const appendedPost = await Posts.AppendChildPost(parentPost?.id, {
        childPosts: childPostsBody,
      }).catch(() => undefined);
      if (!appendedPost) {
        setStatus({
          loading: false,
          msg: "Error Creating Post",
          type: "error",
        });
        return;
      }
    }
    setStatus({ loading: false, msg: "Post Created", type: "success" });

    router.push(`/?createdPost=${parentPost.id}`, "/");
  };

  return (
    <ContentForm
      actionText="Post"
      onSubmitForm={handleOnSubmit}
      validationSchema={createPost}
    ></ContentForm>
  );
}

export default ContentAdd;
