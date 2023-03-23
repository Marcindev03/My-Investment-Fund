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
    }),
    getOperationsRequests: builder.query<OperationsResponse, void>({
      query: () => ({
        url: `/operations?${query}`,
      }),
    }),
  }),
});

export const {
  useGetInvestmentsRequestsQuery,
  useGetOperationsRequestsQuery,
  util: { getRunningQueriesThunk },
} = requestsApiSlice;

export const { getInvestmentsRequests, getOperationsRequests } =
  requestsApiSlice.endpoints;
