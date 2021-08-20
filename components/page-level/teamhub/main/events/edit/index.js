import React, { useState, useEffect } from "react";
import cn from "classnames";
import moment from "moment";
import Link from "next/link";
import TemplateInput from "@sub/input";
import Button from "@sub/button";
import useForm from "@sub/hook-form";
import DragDrop from "@sub/drag-drop";
import Alert from "@sub/alert";
import UploadSVG from "@svg/upload";
import { editEvent as editEventSchema } from "@utils/schemas/event.schema";
import styles from "./index.module.css";

// Todo: make a svg and replace this
function CloseSVG() {
  return (
    <span
      style={{
        color: "#ffffff",
        background: "#c41d24",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        height: 35,
        width: 35,
      }}
    >
      x
    </span>
  );
}

function EditEventForm({ event }) {
  const { register, handleSubmit, errors, setValue } = useForm({
    schema: editEventSchema,
  });

  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState(null);
  const [statusMsg, setStatusMsg] = useState({
    type: null,
    text: null,
    animateText: false,
  });

  useEffect(() => {
    setValue("title", event?.title || "");
    setValue("date", moment(event?.eventDateTime).format("YYYY-MM-DD"));
    setValue("time", moment(event?.eventDateTime).format("hh:mm:ss"));
    setValue("location", event?.location || "");
    setValue("fee", event?.fee || "");
    setValue("message", event?.message || "");
    setValue("media", event?.coverImage || "");
    setMedia({
      src: event?.coverImage || null,
      file: null,
    });
  }, []);

  const handleImageDropped = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0].type.includes("video")) return;

    const file = e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const mediaPicked = {
        src: e.target.result,
        file,
      };
      setValue("media", mediaPicked?.src);
      setMedia(mediaPicked);
    };
    reader.readAsDataURL(file);
  };

  const handleImagePicked = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const mediaPicked = {
        src: e.target.result,
        file,
      };
      setValue("media", mediaPicked?.src);
      setMedia(mediaPicked);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    console.log("data => ", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGridWrapper}>
        <div className={cn(styles.span2, styles.gridItem)}>
          <TemplateInput
            type="text"
            name="title"
            placeholder="Edit Title"
            inputClassName={styles.editEventTitleInput}
            customProps={{ ...register("title") }}
            hint={
              errors?.title && {
                type: "error",
                msg: errors?.title?.message,
                inputBorder: true,
              }
            }
          />
        </div>
        <div className={cn(styles.span1, styles.gridItem)}>
          <p>When?</p>
          <TemplateInput
            type="date"
            name="date"
            customProps={{ ...register("date") }}
            hint={
              errors?.date && {
                type: "error",
                msg: errors?.date?.message,
                inputBorder: true,
              }
            }
          />
        </div>
        <div className={cn(styles.span1, styles.gridItem)}>
          <p>What Time?</p>
          <TemplateInput
            type="time"
            name="time"
            customProps={{ ...register("time") }}
            hint={
              errors?.time && {
                type: "error",
                msg: errors?.time?.message,
                inputBorder: true,
              }
            }
          />
        </div>
        <div className={cn(styles.span1, styles.gridItem)}>
          <p>Where?</p>
          <TemplateInput
            type="text"
            name="location"
            placeholder="Edit Match Location"
            customProps={{ ...register("location") }}
            hint={
              errors?.location && {
                type: "error",
                msg: errors?.location?.message,
                inputBorder: true,
              }
            }
          />
        </div>
        <div className={cn(styles.span1, styles.gridItem)}>
          <p>Add Fee?</p>
          <TemplateInput
            type="number"
            name="fee"
            placeholder="Fee"
            customProps={{ ...register("fee"), min: "0", step: ".01" }}
            hint={
              errors?.fee && {
                type: "error",
                msg: errors?.fee?.message,
                inputBorder: true,
              }
            }
          />
        </div>
        <div className={cn(styles.span1, styles.gridItem)}>
          <p>Add Message?</p>
          <TemplateInput
            type="text"
            name="message"
            placeholder="Message for Invitees"
            customProps={{ ...register("message") }}
            hint={
              errors?.message && {
                type: "error",
                msg: errors?.message?.message,
                inputBorder: true,
              }
            }
          />
        </div>
        <div className={cn(styles.span2, styles.gridItem)}>
          <p>Cover Image</p>
          {!media ? (
            <>
              <DragDrop
                className={cn(
                  styles.dragDropVideos,
                  errors?.media?.message && styles.errorInput
                )}
                onDrop={handleImageDropped}
              >
                <input
                  hidden
                  name="media"
                  accept="image/*"
                  id="pick-parent-media"
                  type="file"
                  onChange={handleImagePicked}
                />
                <label htmlFor="pick-parent-media">
                  <UploadSVG></UploadSVG>
                </label>
                <span className={styles.marginTop}>
                  <span>Drag and drop an Image or</span>
                  &ensp;
                  <a className={styles.dragDropVideosBrowseFiles}>
                    <label htmlFor="pick-parent-media">Browse Files</label>
                  </a>
                </span>
              </DragDrop>
              {errors?.media?.message && (
                <p className={styles.errorMsg}>{errors?.media?.message}</p>
              )}
            </>
          ) : (
            <div className={styles.parentMediaItem}>
              {media?.src?.includes("image") && <img src={media?.src}></img>}
              <span
                className={styles.mediaCloseIcon}
                onClick={() => {
                  setMedia(null);
                  setValue("media", null);
                }}
              >
                <CloseSVG />
              </span>
            </div>
          )}
        </div>
        {statusMsg?.type && statusMsg?.text && (
          <div className={cn(styles.span2, styles.gridItem)}>
            <Alert
              variant={statusMsg?.type}
              text={statusMsg?.text}
              animateText={statusMsg?.animateText}
            />
          </div>
        )}
        <div className={cn(styles.span2, styles.gridItem)}>
          <div className={styles.submitButtonWrapper}>
            <Button type="submit" loading={loading} disabled={loading}>
              Post
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

function EditEvent({ event }) {
  const [_event] = useState({ ...event });

  return (
    <div className={styles.editEventWrapper}>
      <div className={styles.editEventHeader}>
        <h1 className={styles.editEventTitle}>Edit Event</h1>
        <Link href="/teamhub/event">
          <a>
            <span>Cancel</span>
          </a>
        </Link>
      </div>
      <div className={styles.editEventBodyWrapper}>
        <EditEventForm event={_event} />
      </div>
    </div>
  );
}

export default EditEvent;
