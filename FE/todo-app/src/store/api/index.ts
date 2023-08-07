import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AppState } from "../store";

export const appApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://p1338-zfdc23b91-z23ff5a2f-gtw.zb07046ae.criom.sh/",
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState() as AppState;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Group", "User", "ToDo", "Me"],
  endpoints: () => ({}),
});
