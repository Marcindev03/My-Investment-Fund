import qs from "qs";
import { apiSlice } from "store/api/apiSlice";
import { ClientsResponse } from "types/client";

const query = qs.stringify(
  {
    populate: "users_permissions_user",
  },
  {
    encodeValuesOnly: true, // prettify URL
  }
);

export const clientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<ClientsResponse, void>({
      query: () => ({
        url: `/clients?${query}`,
      }),
    }),
  }),
});

export const {
  useGetClientsQuery,
  util: { getRunningQueriesThunk },
} = clientsApiSlice;

export const { getClients } = clientsApiSlice.endpoints;
