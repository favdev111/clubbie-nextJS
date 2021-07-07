import Joi, { allow } from "joi";
import sports from "@utils/fixedValues/sports";

const createPost = Joi.object()
  .keys({
    caption: Joi.string().trim().required().messages({
      "string.empty": "Caption is required",
    }),
    sport: Joi.string()
      .valid("", ...Object.values(sports))
      .optional()
      .messages({
        "any.only": "Sport is required with tags",
      }),
    tagSomeone: Joi.string().allow("").optional().messages({
      "any.invalid": "Tags are required with sport",
      "string.empty": "Tags are required with sport",
    }),
  })
  .when(
    Joi.object({
      sport: Joi.exist().valid(...Object.values(sports)),
    }).unknown(),
    {
      then: Joi.object({
        tagSomeone: Joi.string().invalid("").required(),
      }),
    }
  )
  .when(
    Joi.object({
      tagSomeone: Joi.exist().invalid(""),
    }).unknown(),
    {
      then: Joi.object({
        sport: Joi.string()
          .valid(...Object.values(sports))
          .invalid("")
          .required(),
      }),
    }
  );

const updatePost = Joi.object()
  .keys({
    caption: Joi.string().trim().required().messages({
      "string.empty": "Caption is required",
    }),
    sport: Joi.string()
      .valid("", ...Object.values(sports))
      .optional()
      .messages({
        "any.only": "Sport is required with tags",
      }),
    tagSomeone: Joi.string().allow("").optional().messages({
      "any.invalid": "Tags are required with sport",
      "string.empty": "Tags are required with sport",
    }),
  })
  .when(
    Joi.object({
      sport: Joi.exist().valid(...Object.values(sports)),
    }).unknown(),
    {
      then: Joi.object({
        tagSomeone: Joi.string().invalid("").required(),
      }),
    }
  )
  .when(
    Joi.object({
      tagSomeone: Joi.exist().invalid(""),
    }).unknown(),
    {
      then: Joi.object({
        sport: Joi.string()
          .valid(...Object.values(sports))
          .invalid("")
          .required(),
      }),
    }
  );

module.exports = {
  createPost,
  updatePost,
};
