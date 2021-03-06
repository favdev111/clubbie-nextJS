import React from "react";
import { useForm as _useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

function useForm({ schema }) {
  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    getValues,
    setError,
    watch,
    formState: { errors },
  } = _useForm(
    schema && {
      resolver: joiResolver(schema),
    }
  );

  return {
    register,
    unregister,
    handleSubmit,
    setValue,
    getValues,
    setError,
    errors,
    watch,
  };
}

export default useForm;
