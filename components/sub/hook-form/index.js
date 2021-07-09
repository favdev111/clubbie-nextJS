import React from "react";
import { useForm as _useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

function useForm({ schema }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = _useForm(
    schema && {
      resolver: joiResolver(schema),
    }
  );

  return {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    errors,
  };
}

export default useForm;
