import Joi from "joi";
import { password } from "./customValidations";
const loginWithLocal = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),
  password: Joi.string().required().custom(password).messages({
    "string.empty": "Password is required",
  }),
});

module.exports = {
  loginWithLocal,
};
