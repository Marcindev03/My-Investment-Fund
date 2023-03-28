import qs from "qs";
import { apiSlice } from "store/api/apiSlice";
import { InvestmentsResponse, OperationsResponse } from "types";

const query = qs.stringify(
  {
    filters: {
      adminConfirmed: {
        $eq: false,
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

export const requestsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvestmentsRequests: builder.query<InvestmentsResponse, void>({
      query: () => ({
        url: `/investments?${query}`,
      }),
      providesTags: ["RequestsInvestments"],
    }),
    getOperationsRequests: builder.query<OperationsResponse, void>({
      query: () => ({
        url: `/operations?${query}`,
      }),
    }),
    confirmInvestmentRequest: builder.mutation<void, number>({
      query: (investmentId) => ({
        url: `/investments/${investmentId}`,
        method: "PUT",
        credentials: "include",
        body: {
          data: {
            adminConfirmed: true,
          },
        },
      }),
      invalidatesTags: ["RequestsInvestments"],
    }),
  }),
});

export const {
  useGetInvestmentsRequestsQuery,
  useGetOperationsRequestsQuery,
  useConfirmInvestmentRequestMutation,
  util: { getRunningQueriesThunk },
} = requestsApiSlice;

export const { getInvestmentsRequests, getOperationsRequests } =
  requestsApiSlice.endpoints;
