import Joi from "joi";

const editTeam = Joi.object().keys({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
});

module.exports = {
  editTeam,
};
