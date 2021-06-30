import React from "react";
import Posts from "@api/services/Posts";
import ContentForm from "../common/form";
import router from "next/router";

function ContentEdit({ content }) {
  // Todo: handle child posts edit
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

    // Edit Parent Post
    const parentPost = await (async () => {
      const body = await (async () => {
        if (content?.media !== _media) {
          const uploadedFiles = await uploadMultiplePostMedia([_media]);
          return {
            ...commonBody,
            media: uploadedFiles[0]?.media,
            thumbnail:
              uploadedFiles[0]?.contentType === "image"
                ? null
                : uploadedFiles[0]?.media,
          };
        }
        // use the same image if not changed
        return {
          ...commonBody,
          media: _media,
          thumbnail: _media?.includes("image") === "image" ? null : _media,
        };
      })();

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
        msg: "Error Editing Post",
        type: "error",
      });
      return;
    }

    setStatus({
      loading: false,
      msg: "Post Edited",
      type: "success",
    });

    router.push(`/content/${parentPost.id}`);
  };

  return (
    <ContentForm
      actionText="Edit"
      onSubmitForm={handleOnSubmit}
      contentId={content?.id}
      media={content?.media}
      title={content?.title}
      description={content?.description}
      relatedMediaItems={null} // TODO: child posts edit
      sport={content?.tags[0]?.type || null}
      tagSomeone={
        content?.tags.length > 0
          ? content?.tags.map((x) => x.value).join()
          : null
      }
    ></ContentForm>
  );
}

export default ContentEdit;
