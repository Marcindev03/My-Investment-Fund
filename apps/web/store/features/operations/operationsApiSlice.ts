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
    addOperation: builder.mutation<void, AddOperationArgs>({
      query: ({ amount, type, clientId }) => ({
        url: "/operations",
        method: "POST",
        credentials: "include",
        body: {
          data: {
            amount,
            type,
            date: new Date().toISOString(),
            adminConfirmed: true,
            client: clientId,
          },
        },
      }),
      invalidatesTags: ["BaseCurrencyValue", "BaseCurrencyAmount"],
    }),
  }),
});

export const {
  useGetOperationsQuery,
  useAddOperationMutation,
  util: { getRunningQueriesThunk },
} = operationsApiSlice;

export const { getOperations, addOperation } = operationsApiSlice.endpoints;

export type AddOperationArgs = {
  amount: number;
  type: OperationType;
  clientId: number;
};
