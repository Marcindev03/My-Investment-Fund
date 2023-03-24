import qs from "qs";
import { apiSlice } from "store/api/apiSlice";
import {
  BaseCurrencyAmountResponse,
  BaseCurrencyValueResponse,
  CurrenciesResponse,
} from "types";

const mostValuableCurrencies = qs.stringify(
  {
    sort: ["value:desc"],
    pagination: {
      pageSize: 2,
    },
  },
  {
    encodeValuesOnly: true,
  }
);

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBaseCurrencyValue: builder.query<BaseCurrencyValueResponse, void>({
      query: () => ({
        url: "/base-currency-value",
      }),
      providesTags: ["BaseCurrencyValue"],
    }),
    getBaseCurrencyAmount: builder.query<BaseCurrencyAmountResponse, void>({
      query: () => ({
        url: "/base-currency-amount",
      }),
      providesTags: ["BaseCurrencyAmount"],
    }),
    getMostValuableCurrencies: builder.query<CurrenciesResponse, void>({
      query: () => ({
        url: `/currencies?${mostValuableCurrencies}`,
      }),
    }),
  }),
});

export const {
  useGetBaseCurrencyValueQuery,
  useGetBaseCurrencyAmountQuery,
  useGetMostValuableCurrenciesQuery,
  util: { getRunningQueriesThunk },
} = dashboardApiSlice;

export const {
  getBaseCurrencyValue,
  getBaseCurrencyAmount,
  getMostValuableCurrencies,
} = dashboardApiSlice.endpoints;
