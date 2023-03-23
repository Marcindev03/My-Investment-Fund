import Head from "next/head";
import Admin from "layouts/Admin";
import ClientsTable from "modules/clients/ClientsTable/ClientsTable";
import { wrapper } from "store";
import {
  getClients,
  getRunningQueriesThunk,
  useGetClientsQuery,
} from "store/features/clients/clientsApiSlice";

export default function Clients() {
  const { data } = useGetClientsQuery();

  return (
    <>
      <Head>
        <title>Admin - Clients</title>
      </Head>
      <div className="flex flex-wrap mt-4">
        <ClientsTable clients={data?.data.slice(0, 10) ?? []} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getClients.initiate());

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

Clients.layout = Admin;
