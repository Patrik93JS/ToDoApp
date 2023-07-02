import { appApi } from ".";
import { CreateToDoRequest, CreateToDoResponse, GetToDosResponse, UpdateToDoRequest, UpdateToDoResponse } from "@/types/ToDo";

export const todoApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getToDos: builder.query<GetToDosResponse, void>({
      query: () => ({
        url: "api/to-dos",
        method: "GET",
      }),
      providesTags: (result) => (result ? [{ type: "ToDo" }] : []),
    }),
    createToDo: builder.mutation<CreateToDoResponse, CreateToDoRequest>({
      query: ({ ...body }) => ({
        url: "api/to-dos",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "ToDo" }],
    }),
    updateToDo: builder.mutation<UpdateToDoResponse, UpdateToDoRequest>({
      query: ({ id, ...rest }) => ({
        url: `/api/to-dos/${id}`,
        method: "PUT",
        body: {
          data: rest,
        },
      }),
      invalidatesTags: [{ type: "ToDo" }],
    }),
  }),
});

export const { useCreateToDoMutation, useGetToDosQuery, useUpdateToDoMutation } = todoApi;
