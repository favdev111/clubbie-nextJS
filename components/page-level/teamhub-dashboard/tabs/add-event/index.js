import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import cn from "classnames";
import Link from "next/link";

import Event from "@api/services/Event";
import Files from "@api/services/Files";
import Teams from "@api/services/Teams";

import Training from "@svg/training";
import Match from "@svg/match";
import { useRouter } from "next/router";
import MessageToUser from "@sub/messageAnimation";

import { schema } from "@utils/schemas/addEvent";
import { today } from "@utils/helpers/day";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import FormSubmit from "../edit-event/submit";
import UploadMedia from "@sub/upload";
import FormCell from "@sub/event-form-cell";
import EventFormGrid from "@sub/event-form-grid";

/* Todo -> Display validate errors */

function AddEvent({ user }) {
  const [responseMessage, setResponseMessage] = useState();
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [recurringEvent, setRecurring] = useState(0);
  const [interval, intervalSet] = useState(0);
  const [userTeams, setUserTeams] = useState([]);
  const [checked, setChecked] = useState(true);
  const [media, setMedia] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  /* Media  */
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
  const deleteMedia = () => {
    setMedia(null);
  };
  /* Get teams for team selectbox */
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

  /* Form submit */
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
    data?.eventType != "training" && teams.push(teamB);

    const createRecurringObj = () => {
      if (data?.recurring == "yes") {
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
      fee: data?.fee || null,
      teams: teams,
      recurring: createRecurringObj(),
      coverImage: mediaIdToUpload,
    };
    const updateBody = Object.fromEntries(
      Object.entries(formBody).filter(([_, v]) => v != null)
    );

    await Event.CreateEvent(updateBody)
      .then((res) => {
        setResponseMessage("Succesfully created.");
        setSuccess(true);
        setTimeout(() => {
          router.push(`/teamhub/event/${res.data.id}`);
        }, 3000);
      })
      .catch((err) => {
        setResponseMessage(err.response.data.message);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
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
          <div className={styles.eventType}>
            <div>
              <input
                defaultChecked={checked}
                type="radio"
                className={styles.eventTypeInput}
                value="match"
                {...register("eventType", { required: true })}
              />
              <label
                className={cn(styles.eventTypeLabel, styles.checked)}
                htmlFor="match"
                onClick={() => {
                  setChecked(!checked);
                  setValue("eventType", "match");
                }}
              >
                <Match />
                Match
              </label>
            </div>
            <div>
              <input
                type="radio"
                value="training"
                className={cn(styles.eventTypeInput)}
                defaultChecked={!checked}
                {...register("eventType", { required: true })}
              />
              <label
                onClick={() => {
                  setValue("eventType", "training");
                  setChecked(!checked);
                }}
                className={cn(styles.eventTypeLabel, styles.checked)}
                htmlFor="training"
              >
                <Training />
                Training
              </label>
            </div>
          </div>
          <EventFormGrid>
            <FormCell>
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
            </FormCell>
            <FormCell>
              Team B
              <select
                {...register("teamB", { required: true })}
                className={styles.inputStyle}
              >
                {userTeams.map((i) => (
                  <option value={i.id} key={`${i}12 +${Math.random()}`}>
                    {i.title}
                  </option>
                ))}
              </select>
            </FormCell>

            <FormCell>
              When?
              <input
                className={styles.inputStyle}
                type="date"
                min={today}
                required
                {...register("eventDate", { required: true })}
              />
            </FormCell>
            <FormCell>
              What time?
              <input
                className={styles.inputStyle}
                type="time"
                required
                {...register("eventDateTime", { required: true })}
              />
            </FormCell>
            <FormCell>
              Who?
              <select className={styles.inputStyle}>
                <option {...register("createdBy")}>1</option>
              </select>
            </FormCell>
            <FormCell>
              Where?
              <input
                className={styles.inputStyle}
                type="text"
                required
                {...register("location", { required: true })}
              />
            </FormCell>
            <FormCell>
              Add Fee?
              <input
                className={styles.inputStyle}
                defaultValue="0"
                min="5000"
                type="number"
                {...register("fee")}
              />
            </FormCell>
            <FormCell>
              Add Message?
              <input
                className={styles.inputStyle}
                type="text"
                {...register("message")}
              />
            </FormCell>
            <FormCell>
              Cost Of Event
              <input
                className={styles.inputStyle}
                type="number"
                {...register("cost")}
              />
            </FormCell>
          </EventFormGrid>
          <div className={styles.buttonOptions}>
            Recuring event?
            <div className={styles.buttons}>
              {["Yes", "No "].map((button, index) => (
                <button
                  type="button"
                  key={`${index}buttonforform`}
                  onClick={() => {
                    setValue("recurring", index);
                    setRecurring(index);
                  }}
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
                <option value="0" {...register("recurring")}>
                  Yes
                </option>
              ) : (
                <option value="1" {...register("recurring")}>
                  No
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
          <EventFormGrid>
            <FormCell>
              Start Date
              <input
                className={styles.inputStyle}
                type="date"
                {...register("firstEventStartDate", { required: false })}
              />
            </FormCell>
            <FormCell>
              Number of Events
              <input
                className={styles.inputStyle}
                defaultValue="0"
                type="number"
                {...register("totalEvents")}
              />
            </FormCell>
          </EventFormGrid>
          <FormCell>
            Cover Image
            <UploadMedia
              onFileChange={onFileChange}
              deleteMedia={deleteMedia}
              media={media}
            />
          </FormCell>
          <FormSubmit>
            <button type="submit" className={styles.button}>
              Post
            </button>
          </FormSubmit>
        </form>
      </div>
      {isError && <MessageToUser message={responseMessage} err={isError} />}

      {isSuccess && (
        <MessageToUser message={responseMessage} err={!isSuccess} />
      )}
    </div>
  );
}

export default AddEvent;
