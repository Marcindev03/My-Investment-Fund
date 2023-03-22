import { apiSlice } from "store/api/apiSlice";

export const operationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOperations: builder.query<any, void>({
      query: () => ({
        url: "/operations",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetOperationsQuery,
  util: { getRunningQueriesThunk },
} = operationsApiSlice;

export const { getOperations } = operationsApiSlice.endpoints;
