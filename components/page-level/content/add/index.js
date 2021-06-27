import React, { useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import TemplateInput from "@sub/input";
import TemplateSelect from "@sub/selectbox";
import Button from "@sub/button";
import Files from "@api/services/Files";
import Posts from "@api/services/Posts";
import HTTPClient from "@api/HTTPClient";
import auth from "@utils/helpers/auth";
import sports from "@utils/fixedValues/sports";
import styles from "./contentAdd.module.css";
import UploadSVG from "@svg/upload";
import MediaCard from "./mediaCard";

function ContentAdd() {
  const router = useRouter();

  const [media, setMedia] = useState(null);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [sport, setSport] = useState();
  const [tagSomeone, setTagSomeone] = useState();

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const mediaPicked = {
        src: e.target.result,
        file,
      };
      setMedia(mediaPicked);
      console.log("media");
      console.log(mediaPicked);
    };
    reader.readAsDataURL(file);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!media || !title || !description || !sport || !tagSomeone) {
      alert("All fields are required"); // Todo: handle these properly
      return;
    }

    // POST: files/upload
    let mediaIdToUpload = null;
    if (media?.src && media?.file) {
      const mediaForm = new FormData();
      mediaForm.append("files", media?.file);
      await Files.UploadFile(
        media?.src?.includes("image") ? "postImg" : "postVideo",
        mediaForm
      )
        .then((res) => {
          mediaIdToUpload = res?.data[0]?.id;
          console.log("media res => ", res);
        })
        .catch((err) => {
          console.log("media err => ", err);
          alert(err?.response?.data?.message); // TODO: error comp
        });
    }

    const tags = tagSomeone?.split(",").map((tag) => {
      return {
        type: sport?.trim(),
        value: tag?.trim(),
      };
    });

    const formBody = {
      media: mediaIdToUpload,
      thumbnail: media?.src?.includes("image") ? null : mediaIdToUpload,
      contentType: media?.src?.includes("image") ? "image" : "video",
      title: title?.trim(),
      description: description?.trim(),
      tags,
    };
    const contentBody = Object.fromEntries(
      Object.entries(formBody).filter(([_, v]) => v != null)
    );

    await Posts.CreatePost(contentBody)
      .then((res) => {
        console.log(res);
        router.route("/");
      })
      .catch((err) => console.log(err?.response?.data?.message));
  };

  return (
    <form onSubmit={handleOnSubmit} className={styles.formLogin}>
      <div className={styles.dragDropVideos}>
        <input
          hidden
          accept="image/*,video/*"
          id="icon-button-file"
          type="file"
          onChange={onFileChange}
        />
        <label htmlFor="icon-button-file">
          <UploadSVG></UploadSVG>
        </label>
        <span className={styles.marginTop}>
          {/* Todo: make span drag/dropable */}
          <span>Drag and drop a video or</span>
          &ensp;
          <a className={styles.dragDropVideosBrowseFiles}>
            <label htmlFor="icon-button-file">Browser Files</label>
          </a>
        </span>
      </div>
      <div className={styles.profilePlayerBody}>
        <div className={styles.relatedVideosWrapper}>
          <h3>Related Photos/Videos</h3>
          <div className={styles.mediaPickedBubbleWrapper}>
            <label htmlFor="icon-button-file">
              <MediaCard />
            </label>
            {media && <MediaCard media={media} setMedia={setMedia} />}
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
        <div className={styles.addContentFooter}>
          <div className={styles.addContentFooterLeft}></div>
          <div className={styles.addContentFooterRight}>
            {/* Todo proper */}
            <div className={styles.cancelButton} onClick={() => router.back()}>
              Cancel
            </div>
            <div>
              <Button type="submit">Post</Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ContentAdd;
