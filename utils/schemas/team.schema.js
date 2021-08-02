import Joi from "joi";

const editTeam = Joi.object().keys({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
});

const addSubcriptionPlan = Joi.object().keys({
  amount: Joi.string().required().messages({
    "string.empty": "Amount is required",
  }),
});

module.exports = {
  editTeam,
  addSubcriptionPlan,
};
