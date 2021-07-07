import React, { useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import TemplateInput from "@sub/input";
import TemplateSelect from "@sub/selectbox";
import Button from "@sub/button";
import Files from "@api/services/Files";
import sports from "@utils/fixedValues/sports";
import styles from "./contentForm.module.css";
import UploadSVG from "@svg/upload";
import MediaCard from "./mediaCard";
import Alert from "@sub/alert";
import useForm from "@sub/hook-form";

function ContentForm({
  media,
  relatedMediaItems,
  caption,
  description,
  sport,
  tagSomeone,
  onSubmitForm,
  actionText,
  validationSchema,
}) {
  const router = useRouter();
  console.log(caption);
  const [_media, setMedia] = useState(media || null);
  const [mediaRequired, setMediaRequired] = useState(false);
  const [_relatedMediaItems, setRelatedMediaItems] = useState(
    relatedMediaItems || []
  );
  // const [_caption, setCaption] = useState(caption || null);
  // const [_description, setDescription] = useState(description || null);
  // const [_sport, setSport] = useState(sport || null);
  // const [_tagSomeone, setTagSomeone] = useState(tagSomeone || null);
  const [deleteChildPosts, setDeleteChildPosts] = useState([]);
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
      const relatedMedia = [..._relatedMediaItems, mediaPicked];
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

  const { register, handleSubmit, errors } = useForm({
    schema: validationSchema,
  });

  const handleOnSubmit = async (e) => {
    await onSubmitForm(
      e,
      _media,
      _caption,
      _description,
      _sport,
      _tagSomeone,
      _relatedMediaItems,
      uploadMultiplePostMedia,
      setStatus,
      deleteChildPosts
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    /* 
      this block validates media, Joi does not validate input media filelist, 
      for better ux using it in 2 places. TODO: Find a better solution
    */
    if (typeof e.target?.media === "object") {
      setMediaRequired(true);
    } else {
      setMediaRequired(false);
    }
    await handleSubmit(async (data) => {
      if (typeof e.target?.media === "object") {
        setMediaRequired(true);
        return;
      } else {
        setMediaRequired(false);
      }
      await onSubmitForm({
        _caption: data?.caption,
        _sport: data?.sport,
        _tagSomeone: data?.tagSomeone,
        _media,
        _relatedMediaItems,
        uploadMultiplePostMedia,
        setStatus,
        deleteChildPosts,
      });
    })(e);
  };

  return (
    <form onSubmit={onSubmit}>
      {!_media ? (
        <>
          <div
            className={cn(
              styles.dragDropVideos,
              mediaRequired && styles.errorInput
            )}
          >
            <input
              hidden
              name="media"
              accept="video/*"
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
                <label htmlFor="pick-parent-media">Browse Files</label>
              </a>
            </span>
          </div>
          {mediaRequired && (
            <p className={styles.errorMsg}>Media is required</p>
          )}
        </>
      ) : (
        <MediaCard
          mode="parent-media"
          media={_media}
          setMedia={setMedia}
        ></MediaCard>
      )}
      <div className={styles.formFields}>
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
            {_relatedMediaItems && (
              <MediaCard
                relatedMediaItems={_relatedMediaItems}
                setRelatedMediaItems={setRelatedMediaItems}
                deleteChildPosts={deleteChildPosts}
                setDeleteChildPosts={setDeleteChildPosts}
                mode="related-media"
              />
            )}
          </div>
        </div>
        <div className={styles.contentWrapper}>
          <div className={cn(styles.span2, styles.contentItem)}>
            <TemplateInput
              type="text"
              name="caption"
              placeholder="Caption"
              // value={_caption}
              // onChange={(e) => setCaption(e.target.value)}
              customProps={{ ...register("caption") }}
              hint={
                errors?.caption && {
                  type: "error",
                  msg: errors?.caption?.message,
                  inputBorder: true,
                }
              }
            />
          </div>
          {/* If want to add description in future, uncomment this block, plus update accordingly */}
          {/* <div className={cn(styles.span2, styles.contentItem)}>
            <TemplateInput
              type="text"
              name="description"
              placeholder="Description"
              multiLine
              rows={5}
              value={_description}
              resizable
              onChange={(e) => setDescription(e.target.value)}
            />
          </div> */}
          <div className={cn(styles.span1, styles.contentItem)}>
            <TemplateSelect
              name="sport"
              options={sports}
              placeholder="Sport"
              // selected={_sport}
              // onChange={(e) => setSport(e.target.value)}
              customProps={{ ...register("sport") }}
              hint={
                errors?.sport && {
                  type: "error",
                  msg: errors?.sport?.message,
                  inputBorder: true,
                }
              }
            ></TemplateSelect>
          </div>
          <div className={cn(styles.span1, styles.contentItem)}>
            <TemplateInput
              type="text"
              name="tagSomeone"
              placeholder="Tag Someone (Team, Club, Individual)"
              // value={_tagSomeone}
              // onChange={(e) => setTagSomeone(e.target.value)}
              customProps={{ ...register("tagSomeone") }}
              hint={
                errors?.tagSomeone && {
                  type: "error",
                  msg: errors?.tagSomeone?.message,
                  inputBorder: true,
                }
              }
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
        <div className={styles.contentFooter}>
          <div className={styles.contentFooterLeft}></div>
          <div className={styles.contentFooterRight}>
            <div className={styles.cancelButton} onClick={() => router.back()}>
              Cancel
            </div>
            <div>
              <Button type="submit" loading={status.loading}>
                {actionText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ContentForm;
