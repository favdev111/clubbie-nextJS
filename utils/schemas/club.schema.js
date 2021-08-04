import Joi from "joi";

const editClub = Joi.object().keys({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  description: Joi.string().allow("").optional(),
});

module.exports = {
  editClub,
};
