import Joi from "joi";
import { password } from "./customValidations";

const signup = Joi.object().keys({
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
  passwordConfirm: Joi.string().equal(Joi.ref("password")).required().messages({
    "any.only": "Passwords don't match",
  }),
});

const activateAccount = Joi.object().keys({
  activationCode: Joi.string().min(6).required().messages({
    "string.empty": "Activation code is required",
    "string.min": "Activation code must be 6 digits long",
  }),
});

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


const forgotPassword = Joi.object().keys({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),
});

module.exports = {
  signup,
  activateAccount,
  loginWithLocal,
  forgotPassword,
};
