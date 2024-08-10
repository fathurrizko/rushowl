import axios from "axios";
import { EMAIL_REGEX, MAX_EXAMPLE_USER, URL_GET_USERS, URL_LOGIN } from "./constant";
import { camelCase, isNull, mapKeys } from "lodash";
import { userShape } from "./interfaces";

export const isValidEmail = (email: string) => {
  const result = String(email).toLowerCase().match(EMAIL_REGEX);
  return !isNull(result);
};

const transformedResponse = (data: any) => {
  const result = mapKeys(data, (value: any, key: any) => camelCase(key));
  return result;
};

export const login = async (params: any) => {
  const response = await axios.post(URL_LOGIN, params);
  const transformResponse = {
    ...response,
    data: transformedResponse(response.data),
  };
  return transformResponse;
};

export const getUsers = async () => {
  const response = await axios.get(URL_GET_USERS);
  const filteredResponse = {
    ...response,
    data: response.data.filter((item: userShape, index: number) => index < MAX_EXAMPLE_USER)
  }
  return filteredResponse;
};
