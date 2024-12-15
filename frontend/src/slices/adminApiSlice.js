import { apiSlice } from "./apiSlice";

const ADMIN_URL = '/api/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `${ADMIN_URL}/users`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getSingleUsers: builder.query({
      query: (userId) => ({
        url: `${ADMIN_URL}/single-user/${userId}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${ADMIN_URL}/delete-user/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    updateUserRole: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/edit-user/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/add-user`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    loginAdmin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logoutAdmin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/admin-logout`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetSingleUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useAddUserMutation,
  useLoginAdminMutation,
  useLogoutAdminMutation
} = adminApiSlice;
