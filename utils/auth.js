import Cookie from "js-cookie";
import { ACCESS_TOKEN } from "./enums";

export const setToken = (accessToken) => {
  accessToken && Cookie.set(ACCESS_TOKEN, accessToken, { expires: 365 });
};

export const getToken = () => {
  return Cookie.get(ACCESS_TOKEN);
};

export const removeToken = () => {
  Cookie.remove(ACCESS_TOKEN);
};
