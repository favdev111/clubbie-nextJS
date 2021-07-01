import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import Link from "next/link";
import Event from "@api/services/Event";
import Files from "@api/services/Files";
import Teams from "@api/services/Teams";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DateTime } from "luxon";

import UploadSVG from "@svg/upload";
import DeleteMedia from "@svg/delete-media";
import styles from "./index.module.css";

const schema = yup.object().shape({
  title: yup.string().min(5),
  eventDateTime: yup.string(),
  fee: yup.number(),
  location: yup.string().min(5),
  message: yup.string().min(5),
});

function EditEvent({ user, activeTeam }) {
  const [eventData, setData] = useState(null);
  const [userTeams, setUserTeams] = useState([]);
  const [formMessage, setMessage] = useState();
  const [media, setMedia] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
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

    console.log(updateBody);

    await Event.EditEventbyId(router.query.eventId, updateBody)
      .then((res) => {
        router.push(`/teamhub/event/${res.data.id}`);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("err => ", err);
        setMessage("An error... Please check form");
      });
  };
  function n(n) {
    return n > 9 ? "" + n : "0" + n;
  }
  const dateIso = DateTime.fromISO(eventData?.eventDateTime, { zone: "utc" });
  const minDate =
    `${dateIso.year}` + "-" + `${n(dateIso.month)}` + "-" + `${n(dateIso.day)}`;

  const deleteMedia = () => {
    setMedia(null);
  };

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
          {/* Todo - Like buttons below */}
          <div className={styles.eventType}></div>
          <div className={styles.formGrid}>
            <div className={styles.cell}>
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
            </div>
            <div className={styles.cell}>
              Team B
              <select
                disabled
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
                min={minDate}
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
                placeholder={eventData?.location}
                required
                {...register("location", { required: true })}
              />
            </div>
            <div className={styles.cell}>
              Add Fee?
              <input
                className={styles.inputStyle}
                min="5000"
                type="number"
                {...register("fee")}
              />
            </div>
            <div className={styles.cell}>
              Add Message?
              <input
                className={styles.inputStyle}
                type="text"
                placeholder={eventData?.message}
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

          <div className={styles.cell}>
            Change Cover Image
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
            <div className={styles.coverImage}>
              <div onClick={deleteMedia} className={styles.deleteImage}>
                <DeleteMedia />
              </div>
              {media?.src && <img src={media?.src} />}
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

export default EditEvent;