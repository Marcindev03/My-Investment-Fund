import qs from "qs";
import { apiSlice } from "store/api/apiSlice";
import { ClientResponse, ClientsResponse } from "types/client";

const query = qs.stringify(
  {
    populate: "users_permissions_user",
  },
  {
    encodeValuesOnly: true,
  }
);

export const clientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<ClientsResponse, void>({
      query: () => ({
        url: `/clients?${query}`,
      }),
      providesTags: ["Clients"],
    }),
    addClient: builder.mutation<ClientResponse, number>({
      query: (userId) => ({
        url: "/clients",
        method: "POST",
        credentials: "include",
        body: {
          data: {
            baseCurrencyValue: 0,
            users_permissions_user: userId,
          },
        },
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useAddClientMutation,
  util: { getRunningQueriesThunk },
} = clientsApiSlice;

export const { getClients } = clientsApiSlice.endpoints;
