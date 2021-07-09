import Joi from "joi";

const editProfile = Joi.object().keys({
  fullName: Joi.string().allow("").required(),
  playerTitle: Joi.string().allow("").optional(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .optional()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),
  telephone: Joi.string().allow("").optional(),
  address: Joi.string().allow("").optional(),
  city: Joi.string().allow("").optional(),
  country: Joi.string().allow("").optional(),
  postCode: Joi.string().allow("").optional(),
  bio: Joi.string().allow("").optional(),
});

module.exports = {
  editProfile,
};
