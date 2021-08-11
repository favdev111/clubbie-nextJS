import Joi from "joi";
import eventTypes from "../fixedValues/eventTypes";
import recurringTypes from "../fixedValues/recurringTypes";

const createEvent = Joi.object().keys({
  media: Joi.string().required().messages({
    "any.required": "Media is required",
    "string.empty": "Media is required",
    "string.base": "Media is required",
  }),
  title: Joi.string().required().min(3).messages({
    "string.empty": "Title is required",
    "string.min": "Title must be 3 characters long",
  }),
  eventType: Joi.string()
    .valid(...Object.values(eventTypes))
    .required(),
  date: Joi.string()
    .when("isRecurring", {
      is: Joi.boolean().valid(true),
      then: Joi.forbidden(),
      otherwise: Joi.required(),
    })
    .messages({
      "string.empty": "Date is required",
    }),
  time: Joi.string()
    .when("isRecurring", {
      is: Joi.boolean().valid(true),
      then: Joi.forbidden(),
      otherwise: Joi.required(),
    })
    .messages({
      "string.empty": "Time is required",
    }),
  location: Joi.string().required().messages({
    "string.empty": "Location is required",
  }),
  message: Joi.string().optional().allow(""),
  fee: Joi.number().optional().min(5000).allow("").messages({
    "number.min": "Fee must be greater than £5000",
  }),
  isRecurring: Joi.boolean().optional(),
  recurrOnEvery: Joi.string()
    .valid(...Object.values(recurringTypes))
    .when("isRecurring", {
      is: Joi.boolean().valid(true),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "string.empty": "Interval is required",
    }),
  recurrTotalEvents: Joi.number()
    .min(2)
    .integer()
    .when("isRecurring", {
      is: Joi.boolean().valid(true),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "number.base": "Events Count is required",
      "number.min": "Events Count must be greater than 2",
    }),
  recurrStartDate: Joi.date()
    .when("isRecurring", {
      is: Joi.boolean().valid(true),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "date.base": "Start Date is required",
    }),
  team: Joi.string()
    .when("eventType", {
      is: Joi.string().valid(eventTypes.TRAINING, eventTypes.SOCIAL),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "string.empty": "Team is required",
    }),
  teamA: Joi.string()
    .when("eventType", {
      is: Joi.string().valid(eventTypes.MATCH),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "string.empty": "Team A is required",
    }),
  teamB: Joi.string()
    .when("eventType", {
      is: Joi.string().valid(eventTypes.MATCH),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "string.empty": "Team B is required",
    }),
  socialEventGroup: Joi.string()
    .when("eventType", {
      is: Joi.string().valid(eventTypes.SOCIAL),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "any.only": "Social Group is Required",
      "string.empty": "Social Group is Required",
    }),
});

module.exports = {
  createEvent,
};
