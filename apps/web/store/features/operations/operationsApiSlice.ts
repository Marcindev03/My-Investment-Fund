import { apiSlice } from "store/api/apiSlice";
import { OperationsResponse } from "../../../types";

export const operationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOperations: builder.query<OperationsResponse, void>({
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
