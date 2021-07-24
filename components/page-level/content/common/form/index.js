import React, { useState, useEffect } from "react";
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
import DragDrop from "@sub/drag-drop";
import TagInput from "@sub/tag-input";
import useNotification from "@sub/hook-notification";
import Posts from "@api/services/Posts";

function ContentForm({
  media,
  relatedMediaItems,
  caption,
  description,
  sport,
  tags,
  onSubmitForm,
  actionText,
  validationSchema,
}) {
  const router = useRouter();
  const { showNotificationMsg } = useNotification();

  const [_media, setMedia] = useState(media || null);
  const [mediaRequired, setMediaRequired] = useState(false);
  const [_relatedMediaItems, setRelatedMediaItems] = useState(
    relatedMediaItems || []
  );
  const [_tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
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

  const { register, handleSubmit, errors, setValue } = useForm({
    schema: validationSchema,
  });
  useEffect(() => {
    caption && setValue("caption", caption);
    sport && setValue("sport", sport);
    if (tags) {
      const _tagsTemp = [];
      tags.split(",").map((x) => {
        if (sports.includes(x)) {
          setValue("sport", x);
          return null;
        }
        return _tagsTemp.push({ text: x });
      });
      setTags(_tagsTemp);
    }
  }, [caption, sport, tags]);

  const onSubmit = async (e) => {
    e.preventDefault();
    /* 
      this block validates media, Joi does not validate input media filelist, 
      for better ux using it in 2 places. TODO: Find a better solution
    */
    if (typeof e.target?.media === "object") {
      setMediaRequired(true);
      return;
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
        _tags: _tags,
        _media,
        _relatedMediaItems,
        uploadMultiplePostMedia,
        setStatus,
        deleteChildPosts,
      });
    })(e);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0].type !== "video/mp4") return;

    const file = e.dataTransfer.files[0];
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

  const handleTagSearch = async (searchText) => {
    // TODO: cancel multi req
    if (searchText.trim().length === 0) return;

    // make api call
    setSuggestionsLoading(true);
    const response = await Posts.SearchTags({
      search: searchText,
    }).catch(() => null);

    // notification snack on error
    if (!response) {
      showNotificationMsg("Could Not Get Suggestions", {
        variant: "error",
        displayIcon: true,
      });
      setSuggestions([]);
      setSuggestionsLoading(false);
      return;
    }

    // set suggestions for tag input
    const _suggestions = response?.data;
    const toSet = _suggestions?.map((x) => {
      return {
        text:
          x?.title ||
          x?.name ||
          ((x?.object === "club" || x?.object === "team") && x?.id),
        image:
          x?.crest ||
          x?.image ||
          (x?.object === "club" || x?.object === "team"
            ? "/assets/club-badge-placeholder.png"
            : "/assets/person-placeholder.jpg"),
        type: x?.object,
      };
    });
    setSuggestions(toSet);
    setSuggestionsLoading(false);
  };

  return (
    <form onSubmit={onSubmit}>
      {!_media ? (
        <>
          <DragDrop
            className={cn(
              styles.dragDropVideos,
              mediaRequired && styles.errorInput
            )}
            onDrop={handleDrop}
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
              <span>Drag and drop a video or</span>
              &ensp;
              <a className={styles.dragDropVideosBrowseFiles}>
                <label htmlFor="pick-parent-media">Browse Files</label>
              </a>
            </span>
          </DragDrop>
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
            <TagInput
              placeholder="Tag Someone (Team, Club, Individual)"
              tags={_tags}
              onTagRemove={(tagIndex) => {
                setTags((tags) => {
                  const _tagsTemp = [...tags];
                  _tagsTemp.splice(tagIndex, 1);
                  return _tagsTemp;
                });
              }}
              onInput={handleTagSearch}
              onInputClear={() => setSuggestions([])}
              onInputSubmit={(input) => {
                if (typeof input === "object") {
                  setTags((tags) => {
                    if (tags?.find((x) => x.text === input?.text?.trim()))
                      return tags;
                    return [
                      ...tags,
                      { text: input?.text?.trim(), image: input?.image },
                    ];
                  });
                } else {
                  if (input.trim().length === 0) return;
                  setTags((tags) => {
                    if (tags?.find((x) => x.text === input.trim())) return tags;
                    return [...tags, { text: input.trim() }];
                  });
                }
              }}
              suggestions={suggestions}
              showSuggestions={true}
              suggestionsLoading={suggestionsLoading}
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
