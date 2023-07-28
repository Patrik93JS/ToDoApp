import { LoginRequest, LoginResponse, MeResponse, RegisterRequest, RegisterResponse } from "../../types/Auth";

import { appApi } from "../api/index";

export const authenticationApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ ...body }) => ({
        url: "api/auth/local",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Group" }, { type: "ToDo" }],
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: ({ ...body }) => ({
        url: "api/auth/local/register",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Group" }, { type: "ToDo" }],
    }),
    me: builder.query<MeResponse, void>({
      query: () => ({
        url: "api/users/me?populate=deep,3",
        method: "GET",
      }),
      providesTags: (result) => (result ? [{ type: "Me" }] : []),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useMeQuery } = authenticationApi;
