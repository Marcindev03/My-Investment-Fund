import { apiSlice } from "store/api/apiSlice";
import { OperationsResponse, OperationType } from "../../../types";

export const operationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOperations: builder.query<OperationsResponse, void>({
      query: () => ({
        url: "/operations",
        method: "GET",
      }),
    }),
    addOperation: builder.mutation<
      any,
      { amount: number; type: OperationType; userId: number }
    >({
      query: ({ amount, type, userId }) => ({
        url: "/operations",
        method: "POST",
        body: {
          data: {
            amount,
            type,
          },
        },
      }),
    }),
  }),
});

export const {
  useGetOperationsQuery,
  useAddOperationMutation,
  util: { getRunningQueriesThunk },
} = operationsApiSlice;

export const { getOperations } = operationsApiSlice.endpoints;
