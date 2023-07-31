import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppState } from "../store";

export const appApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL_SERVER,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState() as AppState;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Group", "User", "ToDo", "Me"],
  endpoints: () => ({}),
});
