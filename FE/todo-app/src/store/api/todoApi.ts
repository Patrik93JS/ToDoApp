import { CreateToDoRequest, CreateToDoResponse, GetToDosResponse, UpdateToDoRequest, UpdateToDoResponse } from "@/types/ToDo";

import { appApi } from ".";
import { stringify } from "qs";

export const todoApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getToDos: builder.query<GetToDosResponse, { todoGroupId: number | null }>({
      query: ({ todoGroupId }) => {
        let query = "";

        if (todoGroupId !== undefined) {
          query = stringify(
            {
              filters: {
                to_do_group: {
                  id: { $eq: todoGroupId },
                },
              },
            },
            {
              encodeValuesOnly: true,
            }
          );
        }
        return {
          url: `api/to-dos?populate=deep,3&${query}`,
          method: "GET",
        };
      },
      providesTags: (result) => (result ? [{ type: "ToDo" }] : []),
    }),
    createToDo: builder.mutation<CreateToDoResponse, CreateToDoRequest>({
      query: ({ ...body }) => ({
        url: "api/to-dos",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "ToDo" }, { type: "Group" }],
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
    deleteToDo: builder.mutation({
      query: (id) => ({
        url: `/api/to-dos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ToDo" }],
    }),
    getAllToDos: builder.query<GetToDosResponse, { todoGroupId: number[] | undefined }>({
      query: ({ todoGroupId }) => {
        let query = "";

        if (todoGroupId !== undefined) {
          query = stringify(
            {
              filters: {
                to_do_group: {
                  id: { $in: todoGroupId },
                },
              },
            },
            {
              encodeValuesOnly: true,
            }
          );
        }
        return {
          url: `api/to-dos?populate=deep,3&${query}`,
          method: "GET",
        };
      },
      providesTags: (result) => (result ? [{ type: "ToDo" }] : []),
    }),
  }),
});

export const { useCreateToDoMutation, useGetToDosQuery, useUpdateToDoMutation, useDeleteToDoMutation, useGetAllToDosQuery } = todoApi;
