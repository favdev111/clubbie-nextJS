import React, { useState, useEffect } from "react";
import cn from "classnames";
import moment from "moment";
import TemplateInput from "@sub/input";
import TemplateSelect from "@sub/selectbox";
import Button from "@sub/button";
import useForm from "@sub/hook-form";
import useNotification from "@sub/hook-notification";
import MatchSVG from "@svg/match";
import TrainingSVG from "@svg/training";
import SocialSVG from "@svg/Social";
import Events from "@api/services/Event";
import { createEvent as createEventSchema } from "@utils/schemas/event.schema";
import styles from "./index.module.css";

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
  socialEventGroup,
  recurringIntervals,
}) {
  const { showNotificationMsg } = useNotification();

  const { register, unregister, handleSubmit, errors, setValue } = useForm({
    schema: createEventSchema,
  });

  const [loading, setLoading] = useState(false);
  const [eventType, setEventType] = useState("match");
  const [isRecurring, setIsRecurring] = useState(false);

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

  const onSubmit = async (data) => {
    setLoading(true);

    const commonBody = {
      title: data?.title || null,
      location: data?.location || null,
      message: data?.message || null,
      eventType: data?.eventType || null,
      fee: data?.fee || null,
      freeForSubs: data?.freeForSubs || false, // TODO: update with switch
      freeForSubs: data?.freeForSubs || null,
    };

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
        if (eventType === "training") {
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
    };

    const payload = Object.fromEntries(
      Object.entries(customBody).filter(([_, v]) => v != null)
    );

    const response = await Events.CreateEvent(payload).catch(() => null);
    if (!response) {
      showNotificationMsg("Could not create event", {
        variant: "error",
        displayIcon: true,
      });
      setLoading(false);

      return;
    }
    showNotificationMsg("Event Created Successfully..!", {
      variant: "success",
      displayIcon: true,
    });
    setLoading(false);
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
    } else {
      unregister("teamA");
      unregister("teamB");
    }
  }, [eventType]);

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
              <p>Team A</p>
              <TemplateSelect
                name="teamA"
                placeholder="Select Team A"
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
              <p>Team B</p>
              <TemplateSelect
                name="teamB"
                placeholder="Select Team B"
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
        {eventType === "social" && (
          <div className={cn(styles.span1, styles.gridItem)}>
            <p>Who?</p>
            <TemplateSelect
              name="socialEventGroup"
              placeholder="Select Group"
              options={socialEventGroup.map((x) => x.value)}
              className={styles.addEventSelectInput}
            ></TemplateSelect>
          </div>
        )}
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
          <p>Add Fee?</p>
          <TemplateInput
            type="number"
            name="fee"
            placeholder="Fee"
            customProps={{ ...register("fee") }}
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
                customProps={{ ...register("recurrTotalEvents") }}
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
        {/* Cover Image Here */}
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
  const [_socialEventGroup, setSocialEventGroup] = useState([]);
  const [_recurringIntervals, setRecurringIntervals] = useState([]);

  useEffect(() => {
    const __socialEventGroup = [
      {
        name: "player",
        value: "Player",
      },
      {
        name: "teamLead",
        value: "Team Leaders",
      },
      {
        name: "clubOfficials",
        value: "Club Officials",
      },
    ];
    setSocialEventGroup(__socialEventGroup);

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
      if (x?.owner?.id === user?.id || x?.leader?.id === user?.id) {
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
      <h1 className={styles.addEventTitle}>Create Event</h1>
      <div className={styles.addEventBodyWrapper}>
        <AddEventForm
          teamAList={_teamAList}
          teamBList={_teamBList}
          eventTypes={_eventTypes}
          socialEventGroup={_socialEventGroup}
          recurringIntervals={_recurringIntervals}
        />
      </div>
    </div>
  );
}

export default AddEvent;
