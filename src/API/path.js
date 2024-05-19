const METHODS = {
  POST: "POST",
  GET: "GET",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

export const register = { url: "/auth/register", method: METHODS.POST };

export const login = { url: "/auth/login", method: METHODS.POST };

export const updateUser = { url: "/users", method: METHODS.PATCH };

export const upadateUserById = { url: "/users/{{userId}}", method: METHODS.PATCH };

export const userDetails = { url: "/users", method: METHODS.GET };

export const fileUpload = { url: "/files/upload", method: METHODS.POST };

export const fetchStatistic = { url: "/users/fetch/statistics", method: METHODS.GET };

export const exploreList = {
  url: `/users/queryUsersWithPagination`,
  method: METHODS.GET,
};
