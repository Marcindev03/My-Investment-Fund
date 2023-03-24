import { apiSlice } from "store/api/apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBaseCurrencyValue: builder.query<any, void>({
      query: () => ({
        url: "/base-currency-value",
      }),
      providesTags: ["BaseCurrencyValue"],
    }),
    getBaseCurrencyAmount: builder.query<any, void>({
      query: () => ({
        url: "/base-currency-amount",
      }),
      providesTags: ["BaseCurrencyAmount"],
    }),
  }),
});

export const {
  useGetBaseCurrencyValueQuery,
  useGetBaseCurrencyAmountQuery,
  util: { getRunningQueriesThunk },
} = dashboardApiSlice;

export const { getBaseCurrencyValue, getBaseCurrencyAmount } =
  dashboardApiSlice.endpoints;
