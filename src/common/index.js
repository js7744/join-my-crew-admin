export const getSessionToken = () => localStorage.getItem("auth-access") ?? "";

export const updateToken = (access, refresh) => {
  localStorage.setItem("auth-access", access);
  localStorage.setItem("refresh-access", refresh);
};
