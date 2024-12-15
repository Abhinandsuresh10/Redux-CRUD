
import { apiSlice } from "./apiSlice";
const USER_URL = '/api/users'


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (bulider) => ({
        login: bulider.mutation({
            query: (data) => ({
                url: `${USER_URL}/auth`,
                method: 'POST',
                body: data
            })
        }),
        register: bulider.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: 'POST',
                body: data
            })
        }),
        logout: bulider.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: 'POST',
            })
        }),
        updateUser: bulider.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),        
    })
})

export const { useLoginMutation , useLogoutMutation , useRegisterMutation , useUpdateUserMutation} = usersApiSlice;