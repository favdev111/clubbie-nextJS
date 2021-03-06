import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import moment from "moment";
import Link from "next/link";
import TemplateInput from "@sub/input";
import TemplateSelect from "@sub/selectbox";
import TemplateSwitchInput from "@sub/switch-input";
import Button from "@sub/button";
import useForm from "@sub/hook-form";
import DragDrop from "@sub/drag-drop";
import Alert from "@sub/alert";
import MatchSVG from "@svg/match";
import TrainingSVG from "@svg/training";
import SocialSVG from "@svg/social";
import UploadSVG from "@svg/upload";
import Events from "@api/services/Events";
import Files from "@api/services/Files";
import { createEvent as createEventSchema } from "@utils/schemas/event.schema";
import statusTypes from "@utils/fixedValues/eventStatusTypes";
import { getRecurringDates } from "@utils/global/recurringDates";
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

function IntervalTypes({ intervals, onSelect }) {
  const [active, setActive] = useState(intervals[0].type);

  const _onSelect = (type) => {
    setActive(type);
    onSelect(type);
  };

  return (
    <div className={cn(styles.span2, styles.gridItem, styles.intervalWrapper)}>
      <p>Interval</p>
      <div className={styles.recurringEventButtons}>
        {intervals.map((x) => (
          <span>
            <Button
              className={cn(
                active === x.type
                  ? styles.activeIntervalButton
                  : styles.passiveIntervalButton
              )}
              onClick={() => _onSelect(x.type)}
              type={"button"}
            >
              {x.value}
            </Button>
          </span>
        ))}
      </div>
    </div>
  );
}

function EventTypes({ eventTypes, onSelect }) {
  const [active, setActive] = useState("match");

  const _onSelect = (type) => {
    setActive(type);
    onSelect(type);
  };

  return (
    <div className={styles.eventTypesWrapper}>
      {eventTypes.map((x) => (
        <div
          className={cn(
            styles.eventType,
            active === x.type && styles.eventTypeSelected
          )}
          onClick={() => _onSelect(x.type)}
        >
          {x.type === "match" && <MatchSVG />}
          {x.type === "training" && <TrainingSVG />}
          {x.type === "social" && <SocialSVG />}
          <span>{x.value}</span>
        </div>
      ))}
    </div>
  );
}

function AddEventForm({
  teamAList,
  teamBList,
  eventTypes,
  socialEventGroups,
  recurringIntervals,
}) {
  const router = useRouter();
  const {
    register,
    unregister,
    handleSubmit,
    errors,
    setValue,
    watch,
  } = useForm({
    schema: createEventSchema,
  });

  const [loading, setLoading] = useState(false);
  const [eventType, setEventType] = useState("match");
  const [isRecurring, setIsRecurring] = useState(false);
  const [media, setMedia] = useState(null);
  const [statusMsg, setStatusMsg] = useState({
    type: null,
    text: null,
    animateText: false,
  });
  const [endRecurringDate, setEndRecurringDate] = useState(null);

  const convertDateAndTimeToIso = (date, time) => {
    const _date = date;
    const _time = time + ":00";
    const dateTime = moment(
      `${_date} ${_time}`,
      "YYYY-MM-DD HH:mm:ss"
    ).format();
    const isoDateTime = new Date(dateTime).toISOString();
    return isoDateTime;
  };

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
    setLoading(true);

    // Upload cover image
    let coverImage = null;
    if (media?.file) {
      setStatusMsg({
        type: "info",
        text: "Uploading Cover Image",
        animateText: true,
      });
      const imageForm = new FormData();
      imageForm.append("files", media?.file);
      const responseCoverImage = await Files.UploadFile(
        "userImg",
        imageForm
      ).catch(() => null);
      coverImage = responseCoverImage?.data[0]?.s3Url;
      if (!coverImage) {
        setStatusMsg({
          type: "error",
          text: "Could Not Upload Cover Image..!",
        });
        setLoading(false);
        return;
      }
    }

    // common request body
    const commonBody = {
      title: data?.title || null,
      location: data?.location || null,
      message: data?.message || null,
      eventType: data?.eventType || null,
      fee: {
        forSub: data?.feeForSubscribers || 0.0,
        forNonSub: data?.feeForNonSubscribers || 0.0,
      },
      status: statusTypes.PUBLISHED, // TODO: update it with draft
    };

    // dynamic request body
    const customBody = {
      ...commonBody,
      teams: (() => {
        const _arr = [];
        if (eventType === "match") {
          data?.teamA &&
            _arr.push(
              teamAList.find(
                (x) => x.title.toLowerCase() === data?.teamA?.toLowerCase()
              )?.id
            );
          data?.teamB &&
            _arr.push(
              teamBList.find(
                (x) => x.title.toLowerCase() === data?.teamB?.toLowerCase()
              )?.id
            );
        }
        if (eventType === "training" || eventType === "social") {
          data?.team &&
            _arr.push(
              teamAList.find(
                (x) => x.title.toLowerCase() === data?.team?.toLowerCase()
              )?.id
            );
        }
        return _arr;
      })(),
      eventDateTime: !data?.isRecurring
        ? convertDateAndTimeToIso(data?.date, data?.time)
        : null,
      recurring: (() => {
        if (data?.isRecurring) {
          return {
            startDate: new Date(data?.recurrStartDate).toISOString(),
            totalEvents: data?.recurrTotalEvents,
            onEvery: data?.recurrOnEvery,
          };
        }
        return null;
      })(),
      socialEventGroup: (() => {
        if (data?.socialEventGroup) {
          return socialEventGroups.find(
            (x) =>
              x?.value?.toLowerCase() === data?.socialEventGroup?.toLowerCase()
          )?.name;
        }
        return null;
      })(),
    };

    // final payload
    const payload = Object.fromEntries(
      Object.entries(customBody).filter(([_, v]) => v != null)
    );

    // create event
    const responseEventCreate = await Events.CreateEvent(payload).catch(
      () => null
    );
    if (!responseEventCreate) {
      setStatusMsg({ type: "error", text: "Could Not Create Event..!" });
      setLoading(false);
      return;
    }

    // add coverImage to event/s created
    if (coverImage) {
      const eventIds = (() => {
        if (responseEventCreate?.data?.length > 0) {
          return responseEventCreate?.data?.map((x) => x?.id);
        }
        return [responseEventCreate?.data?.id];
      })();
      let updateError = null;
      await Promise.all(
        eventIds.map(async (id) => {
          const responseEventEdit = await Events.EditEventbyId(id, {
            coverImage,
          }).catch(() => null);
          if (!responseEventEdit) updateError = true;
        })
      );
      if (updateError) {
        setStatusMsg({ type: "error", text: "Could Not Create Event..!" });
        setLoading(false);
        return;
      }
    }

    setStatusMsg({
      type: "success",
      text: "Event Created Successfully..! Redirecting",
      animateText: true,
    });
    setLoading(false);
    // TODO: redirect with some query params to get that event on the next page
    router.push("/teamhub/events"); // redirect to event page
  };

  useEffect(() => {
    setValue("eventType", "match");
    setValue("isRecurring", false);
  }, []);

  useEffect(() => {
    if (!isRecurring) {
      unregister("recurrTotalEvents");
      unregister("recurrStartDate");
      unregister("recurrOnEvery");
    } else {
      unregister("date");
      unregister("time");
      setValue("recurrOnEvery", "week");
    }
  }, [isRecurring]);

  useEffect(() => {
    if (eventType === "match") {
      unregister("team");
      unregister("socialEventGroup");
    }
    if (eventType === "training") {
      unregister("teamA");
      unregister("teamB");
      unregister("socialEventGroup");
    }
    if (eventType === "social") {
      unregister("teamA");
      unregister("teamB");
      setValue("socialEventGroup", "Everyone in Team");
    }
  }, [eventType]);

  const setRecurringDatesEnd = (startDate, recurringInterval, totalEvents) => {
    if (totalEvents < 2 || totalEvents > 100) {
      endRecurringDate !== null && setEndRecurringDate(null);
      return;
    }
    if (startDate && recurringInterval && totalEvents) {
      // get isoDateTime
      const dateTime = moment(
        `${startDate + ":00"}`,
        "YYYY-MM-DD HH:mm:ss"
      ).format();
      const isoDateTime = new Date(dateTime).toISOString();

      // get recurring dates
      const recurringDates = getRecurringDates(
        isoDateTime,
        totalEvents,
        recurringInterval
      );

      // get date to display
      const _endDate = (() => {
        const temp = recurringDates[recurringDates.length - 1];
        return `End Date ${moment(temp).format("DD/MM/YYYY")}`;
      })();

      if (endRecurringDate !== _endDate) setEndRecurringDate(_endDate);
    } else {
      endRecurringDate !== null && setEndRecurringDate(null);
    }
  };

  watch("recurrStartDate") &&
    setRecurringDatesEnd(
      watch("recurrStartDate"),
      watch("recurrOnEvery"),
      watch("recurrTotalEvents")
    );
  watch("recurrOnEvery") &&
    setRecurringDatesEnd(
      watch("recurrStartDate"),
      watch("recurrOnEvery"),
      watch("recurrTotalEvents")
    );
  watch("recurrTotalEvents") &&
    setRecurringDatesEnd(
      watch("recurrStartDate"),
      watch("recurrOnEvery"),
      watch("recurrTotalEvents")
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGridWrapper}>
        <div className={cn(styles.span2, styles.gridItem)}>
          <TemplateInput
            type="text"
            name="title"
            placeholder="Add Title"
            inputClassName={styles.addEventTitleInput}
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
        <div className={cn(styles.span2, styles.gridItem)}>
          <EventTypes
            eventTypes={eventTypes}
            onSelect={(eventType) => {
              setValue("eventType", eventType);
              setEventType(eventType);
            }}
          />
        </div>
        {(eventType === "training" || eventType === "social") && (
          <div className={cn(styles.span1, styles.gridItem)}>
            <p>Team</p>
            <TemplateSelect
              name="team"
              placeholder="Select Team"
              options={teamAList.map((x) => x.title)}
              className={styles.addEventSelectInput}
              customProps={{ ...register("team") }}
              hint={
                errors?.team && {
                  type: "error",
                  msg: errors?.team?.message,
                  inputBorder: true,
                }
              }
            ></TemplateSelect>
          </div>
        )}
        {eventType === "match" && (
          <>
            <div className={cn(styles.span1, styles.gridItem)}>
              <p>My Team</p>
              <TemplateSelect
                name="teamA"
                placeholder="Select Home Team"
                options={teamAList.map((x) => x.title)}
                className={styles.addEventSelectInput}
                customProps={{ ...register("teamA") }}
                hint={
                  errors?.teamA && {
                    type: "error",
                    msg: errors?.teamA?.message,
                    inputBorder: true,
                  }
                }
              ></TemplateSelect>
            </div>
            <div className={cn(styles.span1, styles.gridItem)}>
              <p>Opposition Team</p>
              <TemplateSelect
                name="teamB"
                placeholder="Select Opposing Team"
                options={teamBList.map((x) => x.title)}
                className={styles.addEventSelectInput}
                customProps={{ ...register("teamB") }}
                hint={
                  errors?.teamB && {
                    type: "error",
                    msg: errors?.teamB?.message,
                    inputBorder: true,
                  }
                }
              ></TemplateSelect>
            </div>
          </>
        )}{" "}
        {!isRecurring && (
          <>
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
          </>
        )}
        {/* {eventType === "social" && (
          <div className={cn(styles.span1, styles.gridItem)}>
            <p>Who?</p>
            <TemplateSelect
              name="socialEventGroup"
              placeholder="Select Group"
              options={socialEventGroups.map((x) => x.value)}
              className={styles.addEventSelectInput}
              customProps={{ ...register("socialEventGroup") }}
              hint={
                errors?.socialEventGroup && {
                  type: "error",
                  msg: errors?.socialEventGroup?.message,
                  inputBorder: true,
                }
              }
            ></TemplateSelect>
          </div>
        )} */}
        <div className={cn(styles.span1, styles.gridItem)}>
          <p>Where?</p>
          <TemplateInput
            type="text"
            name="location"
            placeholder="Add Match Location"
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
          <div className={styles.subcriptionFeeBlocksWrapper}>
            <div className={cn(styles.span1, styles.subcriptionFeeBlock)}>
              <p>Subscriber Fee?</p>
              <TemplateSwitchInput
                type="number"
                name="feeForSubscribers"
                placeholder="Add Fee"
                inActiveText="No Fee"
                inputPrefix="??"
                onInActive={() => unregister("feeForSubscribers")}
                customProps={{ ...register("feeForSubscribers") }}
                inputClassName={styles.removeInputNumericCounter}
                hint={
                  errors?.feeForSubscribers && {
                    type: "error",
                    msg: errors?.feeForSubscribers?.message,
                    inputBorder: true,
                  }
                }
              />
            </div>
            <div className={cn(styles.span1, styles.subcriptionFeeBlock)}>
              <p>Non-Subscriber Fee?</p>
              <TemplateSwitchInput
                type="number"
                name="feeForNonSubscribers"
                placeholder="Add Fee"
                inActiveText="No Fee"
                inputPrefix="??"
                onInActive={() => unregister("feeForNonSubscribers")}
                customProps={{
                  ...register("feeForNonSubscribers"),
                }}
                inputClassName={styles.removeInputNumericCounter}
                hint={
                  errors?.feeForNonSubscribers && {
                    type: "error",
                    msg: errors?.feeForNonSubscribers?.message,
                    inputBorder: true,
                  }
                }
              />
            </div>
          </div>
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
          <p>Recurring Event?</p>
          <div className={styles.recurringEventButtons}>
            {["Yes", "No"].map((x) => (
              <span>
                <Button
                  className={cn(
                    ((isRecurring && x === "Yes") ||
                      (!isRecurring && x === "No")) &&
                      styles.activeRecurringButton,
                    ((!isRecurring && x === "Yes") ||
                      (isRecurring && x === "No")) &&
                      styles.passiveRecurringButton
                  )}
                  onClick={() => {
                    setIsRecurring(x === "Yes" ? true : false);
                    setValue("isRecurring", x === "Yes" ? true : false);
                  }}
                  type={"button"}
                >
                  {x}
                </Button>
              </span>
            ))}
          </div>
        </div>
        {isRecurring && (
          <>
            <IntervalTypes
              intervals={recurringIntervals}
              onSelect={(interval) => setValue("recurrOnEvery", interval)}
            />
            <div className={cn(styles.span1, styles.gridItem)}>
              <p>Start Date</p>
              <TemplateInput
                type="datetime-local"
                name="recurrStartDate"
                customProps={{ ...register("recurrStartDate") }}
                hint={
                  errors?.recurrStartDate && {
                    type: "error",
                    msg: errors?.recurrStartDate?.message,
                    inputBorder: true,
                  }
                }
              />
            </div>
            <div className={cn(styles.span1, styles.gridItem)}>
              <p>Number Of Events</p>
              <TemplateInput
                type="number"
                name="recurrTotalEvents"
                postFixLabel={endRecurringDate}
                customProps={{ ...register("recurrTotalEvents") }}
                inputClassName={styles.removeInputNumericCounter}
                hint={
                  errors?.recurrTotalEvents && {
                    type: "error",
                    msg: errors?.recurrTotalEvents?.message,
                    inputBorder: true,
                  }
                }
              />
            </div>
          </>
        )}
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

function AddEvent({ user, teams }) {
  const [_teams, setTeams] = useState(teams);
  const [_teamAList, setTeamAList] = useState([]);
  const [_teamBList, setTeamBList] = useState([]);
  const [_eventTypes, setEventTypes] = useState([]);
  const [_socialEventGroups, setSocialEventGroup] = useState([]);
  const [_recurringIntervals, setRecurringIntervals] = useState([]);

  useEffect(() => {
    const __socialEventGroups = [
      {
        name: "player",
        value: "Players",
      },
      {
        name: "teamLead",
        value: "Team Leaders",
      },
      {
        name: "clubOfficials",
        value: "Club Officials",
      },
      {
        name: "all",
        value: "Everyone in Team",
      },
    ];
    setSocialEventGroup(__socialEventGroups);

    const __recurringIntervals = [
      {
        type: "week",
        value: "Weekly",
      },
      {
        type: "fortNight",
        value: "Fortnight",
      },
      {
        type: "month",
        value: "Monthly",
      },
    ];
    setRecurringIntervals(__recurringIntervals);

    const __eventTypes = [
      {
        type: "match",
        value: "Match",
      },
      {
        type: "training",
        value: "Training",
      },
      {
        type: "social",
        value: "Social",
      },
    ];
    setEventTypes(__eventTypes);
  }, []);

  useEffect(() => {
    const __teamAList = [];
    const __teamBList = [];

    _teams?.map((x) => {
      let membership = null;
      x?.members?.map((y) => {
        if (y?.user?.id === user?.id) {
          if (
            membership?.roles &&
            !membership?.roles?.find((z) => z === y.role)
          ) {
            membership.roles.push(y.role.toLowerCase());
            return;
          }
          membership = {
            ...y.user,
            roles: [y.role.toLowerCase()],
          };
        }
      });

      if (
        membership?.roles?.includes("owner".toLowerCase()) ||
        membership?.roles?.includes("teamLead".toLowerCase())
      ) {
        __teamAList.push({
          club: x?.club,
          id: x?.id,
          title: x?.title,
          crest: x?.crest,
        });
      } else {
        __teamBList.push({
          club: x?.club,
          id: x?.id,
          title: x?.title,
          crest: x?.crest,
        });
      }
    });

    setTeamAList(__teamAList);
    setTeamBList(__teamBList);
  }, [_teams]);

  return (
    <div className={styles.addEventWrapper}>
      <div className={styles.addEventHeader}>
        <h1 className={styles.addEventTitle}>Create Event</h1>
        <Link href="/teamhub/event">
          <a>
            <span>Cancel</span>
          </a>
        </Link>
      </div>
      <div className={styles.addEventBodyWrapper}>
        {_teamAList?.length > 0 ? (
          <AddEventForm
            teamAList={_teamAList}
            teamBList={_teamBList}
            eventTypes={_eventTypes}
            socialEventGroups={_socialEventGroups}
            recurringIntervals={_recurringIntervals}
          />
        ) : (
          <div className={styles.addEventCTAWrapper}>
            <p>
              You need to be a Team Leader or an Owner in one of your joined
              teams to create an event for that team. Ask your team owner to
              make you a team leader or
            </p>
            <Link href="/teamhub/register-club">
              <a>
                <p className={styles.addEventCTA}>
                  Create your own Club &amp; Team now.
                </p>
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddEvent;
