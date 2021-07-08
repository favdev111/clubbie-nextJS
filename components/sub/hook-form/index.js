import React from "react";
import { useForm as _useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

function useForm({ schema }) {
  const {
    register,
    handleSubmit,
    setValue,
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
    setError,
    errors,
  };
}

export default useForm;
