import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { AppState } from "../store";

export const appApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todo-app-ludvik-cc644353413f.herokuapp.com/",
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState() as AppState;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Group", "User", "ToDo", "Me"],
  endpoints: () => ({}),
});
