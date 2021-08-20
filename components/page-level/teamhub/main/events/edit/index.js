import React from "react";
import cn from "classnames";
import Link from "next/link";
import TemplateInput from "@sub/input";
import Button from "@sub/button";
import DragDrop from "@sub/drag-drop";
import UploadSVG from "@svg/upload";
import styles from "./index.module.css";

function EditEventForm() {
  return (
    <form>
      <div className={styles.formGridWrapper}>
        <div className={cn(styles.span2, styles.gridItem)}>
          <TemplateInput
            type="text"
            name="title"
            placeholder="Edit Title"
            inputClassName={styles.editEventTitleInput}
          />
        </div>
        <div className={cn(styles.span1, styles.gridItem)}>
          <p>When?</p>
          <TemplateInput type="date" name="date" />
        </div>
        <div className={cn(styles.span1, styles.gridItem)}>
          <p>What Time?</p>
          <TemplateInput type="time" name="time" />
        </div>
        <div className={cn(styles.span1, styles.gridItem)}>
          <p>Where?</p>
          <TemplateInput
            type="text"
            name="location"
            placeholder="Edit Match Location"
          />
        </div>
        <div className={cn(styles.span1, styles.gridItem)}>
          <p>Add Fee?</p>
          <TemplateInput type="number" name="fee" placeholder="Fee" />
        </div>
        <div className={cn(styles.span1, styles.gridItem)}>
          <p>Add Message?</p>
          <TemplateInput
            type="text"
            name="message"
            placeholder="Message for Invitees"
          />
        </div>
        <div className={cn(styles.span2, styles.gridItem)}>
          <p>Cover Image</p>
          <DragDrop className={cn(styles.dragDropVideos)}>
            <input
              hidden
              name="media"
              accept="image/*"
              id="pick-parent-media"
              type="file"
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
        </div>
        <div className={cn(styles.span2, styles.gridItem)}>
          <div className={styles.submitButtonWrapper}>
            <Button type="submit">Edit</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

function EditEvent({ user, event }) {
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
        <EditEventForm user={user} event={event} />
      </div>
    </div>
  );
}

export default EditEvent;
