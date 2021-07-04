import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().required(),
  teamA: yup.string().required(),
  teamB: yup.string().when("eventType", {
    is: (eventT) => eventT == "match",
    then: yup
      .string()
      .notOneOf([yup.ref("teamA")], "Teams must be different")
      .required(),
  }),
  eventDateTime: yup.string().required(),
  fee: yup.number(),
  recurring: yup.string().required(),
  firstEventStartDate: yup.string().when("recurring", {
    is: (val) => val == "0",
    then: yup.string().required("You must pick a date for recurring events"),
  }),
  totalEvents: yup.number().when("recurring", {
    is: (val) => val == "0",
    then: yup.number().min(1).required(),
  }),
});
