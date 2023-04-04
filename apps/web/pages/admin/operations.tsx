import Admin from "layouts/Admin";
import Head from "next/head";
import { wrapper } from "store";
import {
  getOperations,
  getRunningQueriesThunk,
} from "store/features/operations/operationsApiSlice";
import { OperationsTable } from "modules/operations";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Admin - Operations</title>
      </Head>
      <div className="flex flex-wrap mt-4">
        <OperationsTable showRequestButton />
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
