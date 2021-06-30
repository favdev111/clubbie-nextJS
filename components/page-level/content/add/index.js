import React from "react";
import Posts from "@api/services/Posts";
import ContentForm from "../common/form";
import router from "next/router";

function ContentAdd() {
  const handleOnSubmit = async (
    e,
    _media,
    _title,
    _description,
    _sport,
    _tagSomeone,
    _relatedMediaItems,
    uploadMultiplePostMedia,
    setStatus
  ) => {
    e.preventDefault();

    if (
      !_media ||
      !_title ||
      !_description ||
      !_sport ||
      !_tagSomeone ||
      !_relatedMediaItems
    ) {
      alert("All fields are required"); // Todo: handle these properly
      return;
    }

    // Common Body for parent and child post
    const tags = _tagSomeone?.split(",").map((tag) => {
      return {
        type: _sport?.trim(),
        value: tag?.trim(),
      };
    });
    const commonBody = {
      title: _title?.trim(),
      description: _description?.trim(),
      tags,
    };

    // Make Parent Post
    const parentPost = await (async () => {
      const uploadedFiles = await uploadMultiplePostMedia([_media]);
      const body = {
        ...commonBody,
        media: uploadedFiles[0]?.media,
        thumbnail:
          uploadedFiles[0]?.contentType === "image"
            ? null
            : uploadedFiles[0]?.media,
        contentType: uploadedFiles[0]?.contentType,
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

    // Make child posts
    const childPosts = await (async () => {
      if (_relatedMediaItems.length === 0) return false;
      const uploadedFiles = await uploadMultiplePostMedia(_relatedMediaItems);

      const posts = await Promise.all(
        uploadedFiles.map(async (file) => {
          const _body = {
            ...commonBody,
            media: file.media,
            thumbnail: file.contentType === "image" ? null : file.media,
            contentType: file.contentType,
          };
          const payload = Object.fromEntries(
            Object.entries(_body).filter(([_, v]) => v != null)
          );
          const _posts = await Posts.CreatePost(payload).catch(
            (e) => undefined
          );
          return _posts?.data;
        })
      );
      return posts?.length > 0 ? posts.filter((x) => x) : false;
    })();
    if (!childPosts) {
      setStatus({
        loading: false,
        msg: "Error Creating Post",
        type: "error",
      });
      return;
    }

    if (childPosts?.length > 0) {
      const payload = { childPosts: childPosts.map((x) => x?.id) };
      const appendedPost = await Posts.AppendChildPost(
        parentPost?.id,
        payload
      ).catch(() => undefined);
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
    <ContentForm actionText="Post" onSubmitForm={handleOnSubmit}></ContentForm>
  );
}

export default ContentAdd;
