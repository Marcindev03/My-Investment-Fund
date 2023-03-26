import { apiSlice } from "store/api/apiSlice";
import { CurrenciesResponse } from "types";

export const currenciesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrencies: builder.query<CurrenciesResponse, void>({
      query: () => ({
        url: "/currencies",
      }),
    }),
  }),
});

export const { useGetCurrenciesQuery } = currenciesApiSlice;

export const { getCurrencies } = currenciesApiSlice.endpoints;
