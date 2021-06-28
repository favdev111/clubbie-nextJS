import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useForm } from "react-hook-form";
import cn from "classnames";
import Link from "next/link";
import Event from "@api/services/Event";
import Files from "@api/services/Files";
import Teams from "@api/services/Teams";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Training from "@svg/training";
import Match from "@svg/match";
import { useRouter } from "next/router";
import UploadSVG from "@svg/upload";

const schema = yup.object().shape({
  title: yup.string().required(),
  teamA: yup.string().required(),
  eventDateTime: yup.string().required(),
  firstEventStartDate: yup.string(),
  totalEvents: yup.string(),
});

const now = new Date();
let dd = now.getDate();
let mm = now.getMonth() + 1;
let yyyy = now.getFullYear();

if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}

const today = yyyy + "-" + mm + "-" + dd;

function AddEvent({ user }) {
  const [recurringEvent, setRecurring] = useState(0);
  const [interval, intervalSet] = useState(0);
  const [userTeams, setUserTeams] = useState([]);
  const [formMessage, setMessage] = useState();
  const [checked, setChecked] = useState(true);
  const [media, setMedia] = useState(null);

  const router = useRouter();

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

  useEffect(() => {
    const fetchUserTeams = async () => {
      /* queries */
      const arr = [];
      user.teams.map((i) => {
        arr.push(i.team);
      });
      const queries = arr.reduce((a, b) => {
        let sum = `${a}` + `&id=${b}`;
        return sum;
      });

      const response = await Teams.GetTeamsWithDetail(`id=${queries}`);
      const allUserTeams = response.data;
      setUserTeams(allUserTeams);
    };
    fetchUserTeams();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  /* todo, object is nearly ready */

  const onSubmit = async (data) => {
    let mediaIdToUpload = null;
    if (media?.src && media?.file) {
      const mediaForm = new FormData();
      mediaForm.append("files", media?.file);
      await Files.UploadFile(
        media?.src?.includes("image") && "resourceFile",
        mediaForm
      )
        .then((res) => {
          mediaIdToUpload = res?.data[0]?.s3Url;
          console.log("media res => ", res);
        })
        .catch((err) => {
          console.log("media err => ", err);
          alert(err?.response?.data?.message); // TODO: error comp
        });
    }

    console.log(mediaIdToUpload);

    const eventDateTime =
      data?.eventDate + "T" + data?.eventDateTime + ":00.000Z";

    const teamA = data?.teamA;
    const teamB = data?.teamB;
    const teams = [];
    teams.push(teamA);
    teams.push(teamB);

    const createRecurringObj = () => {
      if (data?.firstEventStartDate.length > 3) {
        const obj = {
          startDate: data?.firstEventStartDate,
          onEvery: data?.onEvery,
          totalEvents: data?.totalEvents,
        };
        return obj;
      }
    };

    const formBody = {
      title: data?.title,
      eventType: data?.eventType,
      location: data?.location,
      eventDateTime: eventDateTime,
      message: data?.message || null,
      teams: teams,
      recurring: createRecurringObj(),
      coverImage: mediaIdToUpload,
    };
    const updateBody = Object.fromEntries(
      Object.entries(formBody).filter(([_, v]) => v != null)
    );

    console.log(updateBody);
    await Event.CreateEvent(updateBody)
      .then((res) => {
        router.push(`/teamhub/event/${res.data.id}`);
        setMessage("Succesfully Created");
      })
      .catch((err) => {
        console.log("err => ", err);
        setMessage("An error... Please check form");
      });
  };

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
          <p> {errors.title?.message} </p>
          {/* Todo - Like buttons below */}
          <div className={styles.eventType}>
            <div>
              <input
                checked={checked}
                type="radio"
                className={styles.eventTypeInput}
                value="match"
                {...register("eventType", { required: true })}
              />
              <label
                className={cn(styles.eventTypeLabel, styles.checked)}
                htmlFor="match"
                onClick={() => setChecked(!checked)}
              >
                <Match />
                Match
              </label>
            </div>
            <div>
              <input
                type="radio"
                value="train"
                className={cn(styles.eventTypeInput)}
                checked={!checked}
                {...register("eventType", { required: true })}
              />
              <label
                onClick={() => setChecked(!checked)}
                className={cn(styles.eventTypeLabel, styles.checked)}
                htmlFor="train"
              >
                <Training />
                Training
              </label>
            </div>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.cell}>
              Team A
              <select
                {...register("teamA", { required: true })}
                className={styles.inputStyle}
              >
                {userTeams.map((i) => (
                  <option value={i.id} key={`${i}12 +${Math.random()}`}>
                    {i.title}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.cell}>
              Team B
              <select
                {...register("teamB", { required: true })}
                className={styles.inputStyle}
              >
                <option value="60d371268ffc8b40e175fb4b">Team 2</option>
              </select>
            </div>

            <div className={styles.cell}>
              When?
              <input
                className={styles.inputStyle}
                type="date"
                min={today}
                required
                {...register("eventDate", { required: true })}
              />
            </div>
            <div className={styles.cell}>
              What time?
              <input
                className={styles.inputStyle}
                type="time"
                required
                {...register("eventDateTime", { required: true })}
              />
            </div>
            <div className={styles.cell}>
              Who?
              <select className={styles.inputStyle}>
                <option {...register("createdBy")}>1</option>
              </select>
            </div>
            <div className={styles.cell}>
              Where?
              <input
                className={styles.inputStyle}
                type="text"
                required
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
                {...register("firstEventStartDate", { required: false })}
              />
            </div>
            <div className={styles.cell}>
              Number of Events
              <input
                className={styles.inputStyle}
                defaultValue="0"
                type="number"
                {...register("totalEvents")}
              />
            </div>
          </div>
          <div className={styles.cell}>
            Cover Image
            <div className={styles.file}>
              <div className={styles.dragDropVideos}>
                <input
                  hidden
                  accept="image/*,video/*"
                  id="icon-button-file"
                  type="file"
                  onChange={onFileChange}
                />
                <label htmlFor="icon-button-file">
                  <UploadSVG />
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
            </div>
          </div>
          <div className={styles.formSubmit}>
            <button type="submit" className={styles.button}>
              Post
            </button>
          </div>
          {formMessage}
        </form>
      </div>
    </div>
  );
}

export default AddEvent;
