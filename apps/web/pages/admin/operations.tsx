import Admin from "layouts/Admin";
import Head from "next/head";
import { wrapper } from "store";
import {
  getOperations,
  getRunningQueriesThunk,
  useGetOperationsQuery,
} from "store/features/operations/operationsApiSlice";
import { OperationsTable } from "modules/operations";

export default function Dashboard() {
  const { data } = useGetOperationsQuery();

  return (
    <>
      <Head>
        <title>Admin - Operations</title>
      </Head>
      <div className="flex flex-wrap mt-4">
        <OperationsTable operations={data?.data.slice(0, 10) ?? []} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getOperations.initiate());

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

Dashboard.layout = Admin;
