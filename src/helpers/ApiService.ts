import { ErrorResponse } from "@/types";
const BASE_API_URL = window._env_?.API_SERVER || "http://localhost";

export const getApiUrl = (path: string, base = BASE_API_URL) => {
  const slash = path.charAt(0) !== "/" ? "/" : "";

  return `${base}${slash}${path}`;
};

export const get = <T extends object>(url: string): Promise<T> => {
  return fetch(url)
    .then((res) => res.json())
    .then((json: T | ErrorResponse) => {
      if ("errors" in json) throw json.errors;
      return json;
    });
};

export const ApiService = {
  get,
};
