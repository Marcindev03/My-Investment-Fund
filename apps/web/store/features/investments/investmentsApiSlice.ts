import { apiSlice } from "store/api/apiSlice";
import { InvestmentsResponse } from "types";

export const investmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvestments: builder.query<InvestmentsResponse, void>({
      query: () => ({
        url: "/investments",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetInvestmentsQuery,
  util: { getRunningQueriesThunk },
} = investmentsApiSlice;

export const { getInvestments } = investmentsApiSlice.endpoints;
