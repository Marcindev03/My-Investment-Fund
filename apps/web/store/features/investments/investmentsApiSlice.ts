import { apiSlice } from "store/api/apiSlice";
import { InvestmentResponse } from "types";

export const investmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvestments: builder.query<InvestmentResponse, void>({
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
