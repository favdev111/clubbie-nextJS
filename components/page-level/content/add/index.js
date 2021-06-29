import React, { useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import TemplateInput from "@sub/input";
import TemplateSelect from "@sub/selectbox";
import Button from "@sub/button";
import Files from "@api/services/Files";
import Posts from "@api/services/Posts";
import sports from "@utils/fixedValues/sports";
import styles from "./contentAdd.module.css";
import UploadSVG from "@svg/upload";
import MediaCard from "./mediaCard";
import Alert from "@sub/alert";

function ContentAdd() {
  const router = useRouter();

  const [media, setMedia] = useState(null);
  const [relatedMediaItems, setRelatedMediaItems] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [sport, setSport] = useState();
  const [tagSomeone, setTagSomeone] = useState();
  const [status, setStatus] = useState({
    loading: false,
    msg: null,
    type: null,
    animateText: false,
  });

  const onParentMediaPicked = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const mediaPicked = {
        src: e.target.result,
        file,
      };
      setMedia(mediaPicked);
    };
    reader.readAsDataURL(file);
  };

  const onRelatedMediaPicked = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = ""; // reset input value
    const reader = new FileReader();
    reader.onload = (e) => {
      const mediaPicked = {
        src: e.target.result,
        file,
      };
      const relatedMedia = [...relatedMediaItems, mediaPicked];
      setRelatedMediaItems([...relatedMedia]);
    };
    reader.readAsDataURL(file);
  };

  const uploadMultiplePostMedia = async (media) => {
    const URLs = [];
    const forms = [];
    setStatus({
      loading: true,
      msg: "Uploading Media",
      type: "info",
      animateText: true,
    });

    // videos in seperate bucket
    const videosForm = new FormData();
    const videos = media.filter((m) => m?.src?.includes("video"));
    if (videos?.length > 0) {
      videos.map((m) => videosForm.append("files", m.file));
      forms.push({
        data: videosForm,
        purpose: "postVideo",
        contentType: "video",
      });
    }

    // images in seperate bucket
    const imagesForm = new FormData();
    const images = media.filter((m) => m?.src?.includes("image"));
    if (images?.length > 0) {
      images.map((m) => imagesForm.append("files", m.file));
      forms.push({
        data: imagesForm,
        purpose: "postImg",
        contentType: "image",
      });
    }

    // upload videos and images
    const uploads = await Promise.all(
      forms.map(async (form) => {
        const upload = await Files.UploadFile(form.purpose, form.data)
          .then((res) => {
            res.data.map((x) =>
              URLs.push({ contentType: form.contentType, media: x.s3Url })
            );
          })
          .catch(() => undefined);
        return upload;
      })
    );

    return URLs;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (
      !media ||
      !title ||
      !description ||
      !sport ||
      !tagSomeone ||
      !relatedMediaItems
    ) {
      alert("All fields are required"); // Todo: handle these properly
      return;
    }

    // Common Body for parent and child post
    const tags = tagSomeone?.split(",").map((tag) => {
      return {
        type: sport?.trim(),
        value: tag?.trim(),
      };
    });
    const commonBody = {
      title: title?.trim(),
      description: description?.trim(),
      tags,
    };

    // Make Parent Post
    const parentPost = await (async () => {
      const uploadedFiles = await uploadMultiplePostMedia([media]);
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
      if (relatedMediaItems.length === 0) return false;
      const uploadedFiles = await uploadMultiplePostMedia(relatedMediaItems);

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
  };

  return (
    <form onSubmit={handleOnSubmit} className={styles.formLogin}>
      {!media ? (
        <div className={styles.dragDropVideos}>
          <input
            hidden
            accept="image/*,video/*"
            id="pick-parent-media"
            type="file"
            onChange={onParentMediaPicked}
          />
          <label htmlFor="pick-parent-media">
            <UploadSVG></UploadSVG>
          </label>
          <span className={styles.marginTop}>
            {/* Todo: make span drag/dropable */}
            <span>Drag and drop a video or</span>
            &ensp;
            <a className={styles.dragDropVideosBrowseFiles}>
              <label htmlFor="pick-parent-media">Browser Files</label>
            </a>
          </span>
        </div>
      ) : (
        <MediaCard
          mode="parent-media"
          media={media}
          setMedia={setMedia}
        ></MediaCard>
      )}
      <div className={styles.profilePlayerBody}>
        <div className={styles.relatedVideosWrapper}>
          <h3>Related Photos/Videos</h3>
          <div className={styles.mediaPickedBubbleWrapper}>
            <input
              hidden
              accept="image/*,video/*"
              id="pick-related-media"
              type="file"
              onChange={(e) => onRelatedMediaPicked(e)}
            />
            <label htmlFor="pick-related-media">
              <MediaCard mode="pick-related-media" />
            </label>
            {relatedMediaItems && (
              <MediaCard
                relatedMediaItems={relatedMediaItems}
                setRelatedMediaItems={setRelatedMediaItems}
                mode="related-media"
              />
            )}
          </div>
        </div>
        <div className={styles.addContentWrapper}>
          <div className={cn(styles.span2, styles.addContentItem)}>
            <TemplateInput
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={cn(styles.span2, styles.addContentItem)}>
            <TemplateInput
              type="text"
              name="description"
              placeholder="Description"
              multiLine
              rows={5}
              value={description}
              resizable
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={cn(styles.span1, styles.addContentItem)}>
            <TemplateSelect
              name="sport"
              options={sports}
              placeholder="Sport"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
            ></TemplateSelect>
          </div>
          <div className={cn(styles.span1, styles.addContentItem)}>
            <TemplateInput
              type="text"
              name="tagSomeone"
              placeholder="Tag Someone (Team, Club, Individual)"
              value={tagSomeone}
              onChange={(e) => setTagSomeone(e.target.value)}
            />
          </div>
        </div>
        {status.type && (
          <Alert
            variant={status.type}
            text={status.msg}
            animateText={status.animateText}
          ></Alert>
        )}
        <div className={styles.addContentFooter}>
          <div className={styles.addContentFooterLeft}></div>
          <div className={styles.addContentFooterRight}>
            <div className={styles.cancelButton} onClick={() => router.back()}>
              Cancel
            </div>
            <div>
              <Button type="submit" loading={status.loading}>
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ContentAdd;
