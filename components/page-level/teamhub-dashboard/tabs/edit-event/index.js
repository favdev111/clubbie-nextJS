import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import Link from "next/link";
import Event from "@api/services/Event";
import Files from "@api/services/Files";
import Teams from "@api/services/Teams";

import styles from "./index.module.css";

import MessageToUser from "@sub/messageAnimation";

import { schema } from "@utils/schemas/editEvent";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateTime } from "luxon";

import FormSubmit from "./submit";
import UploadMedia from "@sub/upload";
import FormCell from "@sub/event-form-cell";
import EventFormGrid from "@sub/event-form-grid";

/* Todo -> Display validate errors */

function EditEvent({ user, activeTeam }) {
  const [responseMessage, setResponseMessage] = useState();
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [eventData, setData] = useState(null);
  const [userTeams, setUserTeams] = useState([]);
  const [media, setMedia] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  /* Media */
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

  /* Fetch teams for selectbox */
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

  /* Fetch current values for form */
  useEffect(() => {
    const fetchPromise = new Promise((resolve, reject) => {
      const eventData = async () => {
        const response = await Event.FetchSingleEvent(
          router.query.eventId,
          activeTeam
        );
        return response;
      };
      eventData().then((response) => {
        const data = response.data;
        setData(data);
      });
      resolve(eventData());
    });

    fetchPromise
      .then((res) => {
        const dateValue = DateTime.fromISO(res.data.eventDateTime, {
          zone: "utc",
        });
        const date =
          `${dateValue.year}` +
          "-" +
          `${n(dateValue.month)}` +
          "-" +
          `${n(dateValue.day)}`;

        const values = {
          title: res.data?.title,
          location: res.data?.location,
          message: res.data?.message,
          fee: res.data?.fee,
          eventDate: date,
        };
        return values;
      })
      .then((values) => {
        setTimeout(() => {
          reset(values);
        }, 1000);
      });

    return;
  }, [reset]);

  /* Submit */
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

    const formBody = {
      title: data?.title,
      location: data?.location,
      eventDateTime: eventDateTime,
      message: data?.message,
      fee: data?.fee || null,
      coverImage: mediaIdToUpload,
    };
    const updateBody = Object.fromEntries(
      Object.entries(formBody).filter(([_, v]) => v != null)
    );

    await Event.EditEventbyId(router.query.eventId, updateBody)
      .then((res) => {
        setResponseMessage("Succesfully changed.");
        setSuccess(true);
        setTimeout(() => {
          router.push(`/teamhub/event/${res.data.id}`);
        }, 3000);
      })
      .catch((err) => {
        console.log("err => ", err);
        setResponseMessage(err.response.data.message);
        setError(true);
      });
  };

  /* Get min date */
  function n(n) {
    return n > 9 ? "" + n : "0" + n;
  }
  const dateIso = DateTime.fromISO(eventData?.eventDateTime, { zone: "utc" });
  const minDate =
    `${dateIso.year}` + "-" + `${n(dateIso.month)}` + "-" + `${n(dateIso.day)}`;

  return (
    <div className={styles.addEvent}>
      {/* Header */}
      <div className={styles.header}>
        <h1> Edit Event</h1>
        <Link href={`/teamhub/event/${router.query.eventId}`}>Cancel</Link>
      </div>

      {/* Body */}
      <div className={styles.content}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            className={styles.formTitle}
            type="text"
            placeholder={eventData?.title}
            {...register("title", { required: true, maxLength: 20 })}
          />
          <p> {errors.title?.message} </p>
          <div className={styles.eventType} /> {/*  Space */}
          <EventFormGrid>
            <FormCell>
              Team A
              <select
                disabled
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
                disabled
                {...register("teamB", { required: true })}
                className={styles.inputStyle}
              >
                <option value="60d371268ffc8b40e175fb4b">Team 2</option>
              </select>
            </FormCell>
            <FormCell>
              When?
              <input
                className={styles.inputStyle}
                type="date"
                min={minDate}
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
                placeholder={eventData?.location}
                required
                {...register("location", { required: true })}
              />
            </FormCell>
            <FormCell>
              Add Fee?
              <input
                className={styles.inputStyle}
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
                placeholder={eventData?.message}
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
          <FormCell>
            Change Cover Image
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
      {/* Form success/error messages */}
      {isError && <MessageToUser message={responseMessage} err={isError} />}

      {isSuccess && (
        <MessageToUser message={responseMessage} err={!isSuccess} />
      )}
    </div>
  );
}

export default EditEvent;
