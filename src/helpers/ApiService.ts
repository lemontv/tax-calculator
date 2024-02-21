import { ErrorResponse } from "@/types";
const BASE_API_URL = "http://192.168.0.128:5000";

export const getApiUrl = (path: string, base = BASE_API_URL) => {
  const slash = path.charAt(0) !== "/" ? "/" : "";

  return `${base}${slash}${path}`;
};

export const get = <T extends object>(url: string): Promise<T> => {
  return fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json: T | ErrorResponse) => {
      if ("errors" in json) throw new Error(json.errors[0].message);
      return json;
    });
};

export const ApiService = {
  get,
};
