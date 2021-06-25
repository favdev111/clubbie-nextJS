import React from "react";
import styles from "./index.module.css";
import TemplateInput from "@sub/input";

function AddEvent() {
  return (
    <div className={styles.addEvent}>
      {/* Header */}
      <div className={styles.header}>
        <h1> Create Event</h1>
        <button> Cancel</button>
      </div>
      {/* Body */}
      <div className={styles.content}>
        <form>
          <input value="" type="text" placeholder="Add title"></input>

          <input
            defaultChecked
            name="event-type"
            value="match"
            id="match"
            type="radio"
          ></input>
          <label for="match"> Match</label>
          <input
            name="event-type"
            value="train"
            id="train"
            type="radio"
          ></input>
          <label for="train"> Train</label>
          <TemplateInput type="text" name="country" value="profile" />
          <TemplateInput type="text" name="country" value="profile" />
          <TemplateInput type="text" name="country" value="profile" />
          <TemplateInput type="text" name="country" value="profile" />
          <TemplateInput type="text" name="country" value="profile" />
          <TemplateInput type="text" name="country" value="profile" />
          <TemplateInput type="text" name="country" value="profile" />
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
