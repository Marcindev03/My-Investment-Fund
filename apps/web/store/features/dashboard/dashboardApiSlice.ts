import { apiSlice } from "store/api/apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBaseCurrencyValue: builder.query<any, void>({
      query: () => ({
        url: "/base-currency-value",
      }),
      providesTags: ["BaseCurrencyValue"],
    }),
  }),
});

export const {
  useGetBaseCurrencyValueQuery,
  util: { getRunningQueriesThunk },
} = dashboardApiSlice;

export const { getBaseCurrencyValue } = dashboardApiSlice.endpoints;
