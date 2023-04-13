import qs from "qs";
import { apiSlice } from "store/api/apiSlice";
import { InvestmentsResponse } from "types";

const getInvestmentsQuery = qs.stringify(
  {
    populate: "*",
  },
  {
    encodeValuesOnly: true,
  }
);

export const investmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvestments: builder.query<InvestmentsResponse, void>({
      query: () => ({
        url: `/investments?${getInvestmentsQuery}`,
        method: "GET",
      }),
    }),
    addInvestment: builder.mutation<void, AddInvestmentArgs>({
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

export type AddInvestmentArgs = {
  amount: number;
  exchangeRate: number;
  clientId: number;
  currencyId: number;
};
