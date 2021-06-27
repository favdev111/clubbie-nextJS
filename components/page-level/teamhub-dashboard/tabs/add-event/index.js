import React, { useState } from "react";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import cn from "classnames";
import Link from "next/link";
function AddEvent() {
  const [recurringEvent, setRecurring] = useState(0);
  const [interval, intervalSet] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  /* todo, object is nearly ready */
  const onSubmit = (data) => console.log(data);

  return (
    <div className={styles.addEvent}>
      {/* Header */}
      <div className={styles.header}>
        <h1> Create Event</h1>
        <Link href="./">Cancel</Link>
      </div>
      {/* Body */}
      <div className={styles.content}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            className={styles.formTitle}
            type="text"
            placeholder="Add title"
            {...register("title", { required: true, maxLength: 20 })}
          />
          {/* Todo - Like buttons below */}
          <div className={styles.eventType}>
            <div>
              <input
                defaultChecked
                type="radio"
                value="match"
                {...register("eventType", { required: true })}
              />
              <label htmlFor="match"> Match</label>
            </div>
            <div>
              <input
                type="radio"
                value="train"
                {...register("eventType", { required: true })}
              />
              <label htmlFor="train"> Train</label>
            </div>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.cell}>
              Team A
              <select className={styles.inputStyle}>
                <option {...register("teamA", { required: true })}>
                  Team 1
                </option>
              </select>
            </div>
            <div className={styles.cell}>
              Team B
              <select className={styles.inputStyle}>
                <option {...register("teamB", { required: true })}>
                  Team 2
                </option>
              </select>
            </div>

            <div className={styles.cell}>
              When?
              <input
                className={styles.inputStyle}
                type="date"
                {...register("eventDate", { required: true })}
              />
            </div>
            <div className={styles.cell}>
              What time?
              <input
                className={styles.inputStyle}
                type="time"
                {...register("eventDateTime", { required: true })}
              />
            </div>
            <div className={styles.cell}>
              Who?
              <select className={styles.inputStyle}>
                <option {...register("createdBy", { required: true })}>
                  1
                </option>
              </select>
            </div>
            <div className={styles.cell}>
              Where?
              <input
                className={styles.inputStyle}
                type="text"
                {...register("location", { required: true })}
              />
            </div>
            <div className={styles.cell}>
              Add Fee?
              <input
                className={styles.inputStyle}
                defaultValue="0"
                type="number"
                {...register("fee")}
              />
            </div>
            <div className={styles.cell}>
              Add Message?
              <input
                className={styles.inputStyle}
                type="text"
                {...register("message")}
              />
            </div>
            <div className={styles.cell}>
              Cost Of Event
              <input
                className={styles.inputStyle}
                type="number"
                {...register("cost")}
              />
            </div>
          </div>
          <div className={styles.buttonOptions}>
            Recuring event?
            <div className={styles.buttons}>
              {["Yes", "No "].map((button, index) => (
                <button
                  type="button"
                  key={`${index}buttonforform`}
                  onClick={() => setRecurring(index)}
                  className={cn(
                    recurringEvent == index ? styles.button : styles.passive
                  )}
                >
                  {button}
                </button>
              ))}
            </div>
            {/* Hidden */}
            <select className={styles.noShow}>
              {recurringEvent == 0 ? (
                <option value="yes" {...register("recurring")}>
                  Yes
                </option>
              ) : (
                <option value="no" {...register("recurring")}>
                  Yes
                </option>
              )}
            </select>
          </div>
          <div>
            Interval
            <div className={styles.buttons}>
              {["Weekly", "Fortnight", "Monthly"].map((button, index) => (
                <button
                  type="button"
                  key={`${index}buttonforform2`}
                  onClick={() => intervalSet(index)}
                  className={cn(
                    interval == index ? styles.button : styles.passive
                  )}
                >
                  {button}
                </button>
              ))}
            </div>
            {/* Hidden */}
            <select className={styles.noShow}>
              {interval == 0 && (
                <option {...register("onEvery")} value="weekly">
                  Weekly
                </option>
              )}
              {interval == 1 && (
                <option {...register("onEvery")} value="fortnight">
                  Fortnight
                </option>
              )}
              {interval == 2 && (
                <option {...register("onEvery")} value="monthy">
                  Monthly
                </option>
              )}
            </select>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.cell}>
              Start Date
              <input
                className={styles.inputStyle}
                type="date"
                {...register("firstEventStartDate", { required: true })}
              />
            </div>
            <div className={styles.cell}>
              Number of Events
              <input
                className={styles.inputStyle}
                defaultValue="0"
                type="number"
                {...register("totalEvents", { required: true })}
              />
            </div>
          </div>
          <div className={styles.cell}>
            Add files
            <div className={styles.file}>
              {/* Todo */}
              {/*               <input
                className={styles.inputStyle}
                type="file"
                {...register("file", { required: true })}
              /> */}
            </div>
          </div>
          <div className={styles.formSubmit}>
            <button
              type="submit"
              onClick={() => onSubmit()}
              className={styles.button}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
