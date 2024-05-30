import { useState } from "react";



export function useError() {
  const [getErrorResponse, setGetErrorResponse] = useState({});

  const ValidateField = async (name, value, validationSchema) => {
    try {
      await validationSchema.validateAt(name, { [name]: value });
      setGetErrorResponse(prevErrors => ({
        ...prevErrors,
        [name]: '',
      }));
    } catch (err) {
      setGetErrorResponse(prevErrors => ({
        ...prevErrors,
        [name]: err.message,
      }));
    }
  };
  return { ValidateField, getErrorResponse };
}


export function useSubmitError() {
  const [getSubmitResponse, setGetSubmitResponse] = useState({});

  const ValidateSubmitField = async (inputs, validationSchema) => {
  try {
    setGetSubmitResponse({})
    await validationSchema.validate(inputs, { abortEarly: false });
    setGetSubmitResponse(true)
  } catch (err) {
    setGetSubmitResponse({})
    const validationErrors = {};
    err.inner.forEach(error => {
      validationErrors[error.path] = error.message;
    });
    setGetSubmitResponse(validationErrors);
  }
  }
  return { ValidateSubmitField, getSubmitResponse };
}














