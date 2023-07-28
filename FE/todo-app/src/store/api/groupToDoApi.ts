import { CreateGroupToDoRequest, CreateGroupToDoResponse, GetGroupResponse } from "@/types/Group";

import { appApi } from ".";
import { stringify } from "qs";

export const groupApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query<GetGroupResponse, { userId: number }>({
      query: ({ userId }) => {
        const query = stringify(
          {
            filters: {
              owner: {
                id: { $eq: userId },
              },
            },
          },
          {
            encodeValuesOnly: true,
          }
        );
        return {
          url: `api/to-do-groups?populate=deep,3&${query}`,
          method: "GET",
        };
      },
      providesTags: (result) => (result ? [{ type: "Group" }] : []),
    }),
    createGroup: builder.mutation<CreateGroupToDoResponse, CreateGroupToDoRequest>({
      query: ({ ...body }) => {
        return {
          url: `api/to-do-groups?populate=deep,3`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Group" }, { type: "Me" }],
    }),
    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `/api/to-do-groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Group" }, { type: "ToDo" }, { type: "Me" }],
    }),
  }),
});

export const { useCreateGroupMutation, useGetGroupsQuery, useDeleteGroupMutation } = groupApi;
