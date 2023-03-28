import { apiSlice } from "store/api/apiSlice";
import { UsersPermissionsUserResponse } from "types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/local",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    me: builder.query<any, void>({
      query: () => ({
        url: "/users/me?populate=*",
        method: "GET",
        credentials: "include",
      }),
    }),
    registerUser: builder.mutation<
      UsersPermissionsUserResponse,
      { firstName: string; lastName: string; email: string; password: string }
    >({
      query: ({ firstName, lastName, email, password }) => ({
        url: "/auth/local/register",
        method: "POST",
        credentials: "include",
        body: {
          body: {
            username: `${firstName} ${lastName}`,
            email: email,
            password: password,
          },
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useMeQuery, useRegisterUserMutation } =
  authApiSlice;
