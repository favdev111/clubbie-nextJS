import Joi from "joi";
import eventTypes from "../fixedValues/eventTypes";
import recurringTypes from "../fixedValues/recurringTypes";

const createEvent = Joi.object().keys({
  media: Joi.string().optional().messages({
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
  feeForSubscribers: Joi.number().optional().min(1).max(1000).messages({
    "number.base": "Fee must be greater than or equal to £1",
    "number.min": "Fee must be greater than or equal to £1",
    "number.max": "Fee must be less or equal to £1000",
    "number.unsafe": "Fee must be between £1 and £1000",
  }),
  feeForNonSubscribers: Joi.number().optional().min(1).max(1000).messages({
    "number.base": "Fee must be greater than or equal to £1",
    "number.min": "Fee must be greater than or equal to £1",
    "number.max": "Fee must be less or equal to £1000",
    "number.unsafe": "Fee must be between £1 and £1000",
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
    .max(100)
    .integer()
    .when("isRecurring", {
      is: Joi.boolean().valid(true),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "number.base": "Events Count is required",
      "number.min": "Events Count must be greater or equal to 2",
      "number.max": "Events Count must be less or equal to 100",
      "number.unsafe": "Events Counts must be between 2 and 100",
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
      "string.empty": "Home Team is required",
    }),
  teamB: Joi.string()
    .when("eventType", {
      is: Joi.string().valid(eventTypes.MATCH),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "string.empty": "Away Team is required",
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

const editEvent = Joi.object().keys({
  media: Joi.string().optional().allow(""),
  title: Joi.string().min(3).optional().allow("").messages({
    "string.min": "Title must be 3 characters long",
  }),
  date: Joi.string().optional().allow(""),
  time: Joi.string().optional().allow(""),
  location: Joi.string().optional().allow(""),
  message: Joi.string().optional().allow(""),
  feeForSubscribers: Joi.number().optional().min(1).max(1000).messages({
    "number.base": "Fee must be greater than or equal to £1",
    "number.min": "Fee must be greater than or equal to £1",
    "number.max": "Fee must be less or equal to £1000",
    "number.unsafe": "Fee must be between £1 and £1000",
  }),
  feeForNonSubscribers: Joi.number().optional().min(1).max(1000).messages({
    "number.base": "Fee must be greater than or equal to £1",
    "number.min": "Fee must be greater than or equal to £1",
    "number.max": "Fee must be less or equal to £1000",
    "number.unsafe": "Fee must be between £1 and £1000",
  }),
});

module.exports = {
  createEvent,
  editEvent,
};
