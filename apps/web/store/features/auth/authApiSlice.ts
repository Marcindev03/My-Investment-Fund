import { apiSlice } from "store/api/apiSlice";

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
  }),
});

export const { useLoginMutation, useMeQuery } = authApiSlice;
