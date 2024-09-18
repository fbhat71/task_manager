export const validateRequired = (value) =>
  value ? null : "This Field is required";

export const composeValidators =
  (...validators) =>
  (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );
