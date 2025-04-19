export const getRole = (): string | null => {
  return localStorage.getItem("role");
};

export const getEmail = (): string | null => {
  return localStorage.getItem("email");
};

export const getUsername = (): string | null => {
  return localStorage.getItem("username");
};
