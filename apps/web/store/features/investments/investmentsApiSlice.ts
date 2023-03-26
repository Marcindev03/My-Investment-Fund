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
    addInvestment: builder.mutation<
      void,
      {
        amount: number;
        exchangeRate: number;
        clientId: number;
        currencyId: number;
      }
    >({
      query: ({ amount, exchangeRate, clientId, currencyId }) => ({
        url: "/investments",
        method: "POST",
        credentials: "include",
        body: {
          data: {
            amount,
            exchangeRate,
            client: clientId,
            currency: currencyId,
            date: new Date().toISOString(),
            adminConfirmed: true,
          },
        },
      }),
      invalidatesTags: ["BaseCurrencyValue", "BaseCurrencyAmount"],
    }),
  }),
});

export const {
  useGetInvestmentsQuery,
  useAddInvestmentMutation,
  util: { getRunningQueriesThunk },
} = investmentsApiSlice;

export const { getInvestments } = investmentsApiSlice.endpoints;
