const BASE_API_URL = "http://192.168.0.128:5000";

export const getApiUrl = (path: string, base = BASE_API_URL) => {
  const slash = path.charAt(0) !== "/" ? "/" : "";

  return `${base}${slash}${path}`;
};

export const get = <T>(url: string): Promise<T> => {
  return fetch(url).then((res) => res.json());
};

export const ApiService = {
  get,
};
