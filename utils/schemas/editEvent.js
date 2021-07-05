import * as yup from "yup";

export const schema = yup.object().shape({
  title: yup.string().min(5),
  eventDateTime: yup.string(),
  fee: yup.number(),
  location: yup.string().min(5),
  message: yup.string().min(5),
});
