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
    }),
    addClient: builder.mutation<ClientResponse, void>({
      query: () => ({
        url: "/clients",
        method: "POST",
        credentials: "include",
        body: {
          data: {
            baseCurrencyValue: 0,
          },
        },
      }),
    }),
    updateClient: builder.mutation<
      ClientResponse,
      { clientId: number; userId: number }
    >({
      query: ({ clientId, userId }) => ({
        url: `/clients/${clientId}`,
        method: "PUT",
        credentials: "include",
        body: {
          data: {
            user: userId,
          },
        },
      }),
    }),
  }),
});

export const {
  useGetClientsQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  util: { getRunningQueriesThunk },
} = clientsApiSlice;

export const { getClients } = clientsApiSlice.endpoints;
