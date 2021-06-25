import React, { useState } from "react";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import cn from "classnames";

function AddEvent() {
  const [recurringEvent, setRecurring] = useState(0);
  const [interval, intervalSet] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className={styles.addEvent}>
      {/* Header */}
      <div className={styles.header}>
        <h1> Create Event</h1>
        <a> Cancel</a>
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
          <div className={styles.eventType}>
            <div>
              <input
                defaultChecked
                type="radio"
                value="match"
                {...register("eventType", { required: true })}
              ></input>
              <label htmlFor="match"> Match</label>
            </div>
            <div>
              <input
                type="radio"
                value="train"
                {...register("eventType", { required: true })}
              ></input>
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
              ></input>
            </div>
            <div className={styles.cell}>
              Add Fee?
              <input
                className={styles.inputStyle}
                defaultValue="0"
                type="number"
                {...register("fee")}
              ></input>
            </div>
            <div className={styles.cell}>
              Add Message?
              <input className={styles.inputStyle} type="text"></input>
            </div>
            <div className={styles.cell}>
              Cost Of Event
              <input className={styles.inputStyle} type="number"></input>
            </div>
          </div>
          <div className={styles.buttonOptions}>
            Recuring event?
            <div className={styles.buttons}>
              {["Yes", "No "].map((button, index) => (
                <button
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
              <option> Yes </option>
              <option> No </option>
            </select>
          </div>
          <div>
            Interval
            <div className={styles.buttons}>
              {["Weekly", "Fortnight", "Monthly"].map((button, index) => (
                <button
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
              <option> Weekly </option>
              <option> Fortnight </option>
              <option> Monthly </option>
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
              ></input>
            </div>
          </div>
          <div className={styles.file}>
            Number of Events
            <input
              className={styles.inputStyle}
              type="file"
              {...register("file", { required: true })}
            ></input>
            <div className={styles.formSubmit}>
              <button className={styles.button}> Post </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
