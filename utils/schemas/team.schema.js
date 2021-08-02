import Joi from "joi";

const editTeam = Joi.object().keys({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
});

const addSubcriptionPlan = Joi.object().keys({
  amount: Joi.number().required().min(5000).max(10000).integer().messages({
    "any.empty": "Amount is required",
    "number.base": "Amount must be numeric",
    "number.min": "Amount must be greater or equal to 5000",
    "number.max": "Amount must be less or equal to 10000",
    "number.integer": "Amount must not be decimal",
  }),
});

module.exports = {
  editTeam,
  addSubcriptionPlan,
};
