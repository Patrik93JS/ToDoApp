import { CreateGroupToDoRequest, CreateGroupToDoResponse, GetGroupResponse } from "@/types/Group";
import { appApi } from ".";

export const groupApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query<GetGroupResponse, void>({
      query: () => ({
        url: "api/to-do-groups?populate=deep,3",
        method: "GET",
      }),
      providesTags: (result) => (result ? [{ type: "Group" }] : []),
    }),
    createGroup: builder.mutation<CreateGroupToDoResponse, CreateGroupToDoRequest>({
      query: ({ ...body }) => ({
        url: "api/to-do-groups?populate=deep,3",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Group" }],
    }),
    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `/api/to-do-groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Group" }, { type: "ToDo" }],
    }),
  }),
});

export const { useCreateGroupMutation, useGetGroupsQuery, useDeleteGroupMutation } = groupApi;
