export const validatePassword = (
  password: string
): { isValid: boolean; errorMessage: string } => {
  let errors = [];
  if (password.length < 8) errors.push("At least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("One uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("One lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("One number");
  if (!/[^a-zA-Z0-9]/.test(password)) errors.push("One special character");

  if (errors.length === 0) {
    return { isValid: true, errorMessage: "" };
  } else {
    return {
      isValid: false,
      errorMessage: `Password must contain: ${errors.join(", ")}`,
    };
  }
};
