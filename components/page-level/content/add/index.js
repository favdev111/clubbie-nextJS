import React, { useState } from "react";
import { useRouter } from "next/Router";
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
import ImageCard from "./imageCard";

function ContentAdd() {
  const router = useRouter();

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [sport, setSport] = useState();
  const [tagSomeone, setTagSomeone] = useState();

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const imagePicked = {
        src: e.target.result,
        file,
      };
      setImage(imagePicked);
    };
    reader.readAsDataURL(file);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // set access header
    HTTPClient.setHeader("Authorization", `Bearer ${auth.getAccessToken()}`);

    if (!image || !title || !description || !sport)
      alert("All fields are required"); // Todo: handle these properly

    // POST: files/upload
    let imageIdToUpload = null;
    if (image.src && image.file) {
      const imageForm = new FormData();
      imageForm.append("files", image.file);
      await Files.UploadFile("postImg", imageForm)
        .then((res) => {
          imageIdToUpload = res.data[0].id;
          console.log("image res => ", res);
        })
        .catch((err) => {
          console.log("image err => ", err);
          alert(err?.response?.data?.message); // TODO: error comp
        });
    }

    const formBody = {
      media: imageIdToUpload,
      contentType: "image",
      title: title.trim(),
      description: description.trim(),
      tags: [{ type: sport.trim(), value: sport.trim() }],
      // tagSomeone: tagSomeone.trim(),
    };
    console.log(formBody);

    await Posts.CreatePost(formBody)
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
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={onFileChange}
        />
        <label htmlFor="icon-button-file">
          <UploadSVG></UploadSVG>
        </label>
        <span className={styles.marginTop}>
          Drag and drop a video or&ensp;
          <a className={styles.dragDropVideosBrowseFiles}>
            <label htmlFor="icon-button-file">Browser Files</label>
          </a>
        </span>
      </div>
      <div className={styles.profilePlayerBody}>
        <div className={styles.relatedVideosWrapper}>
          <h3>Related Photos/Videos</h3>
          <div className={styles.imagePickedBubbleWrapper}>
            <label htmlFor="icon-button-file">
              <ImageCard />
            </label>
            {image && <ImageCard image={image} />}
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
