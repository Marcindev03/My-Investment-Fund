import Admin from "layouts/Admin";
import Head from "next/head";
import CardTable from "components/Cards/CardTable";
import { wrapper } from "store";
import {
  getOperations,
  getRunningQueriesThunk,
  useGetOperationsQuery,
} from "store/features/operations/operationsApiSlice";

export default function Dashboard() {
  const { data } = useGetOperationsQuery();

  console.debug(data);

  return (
    <>
      <Head>
        <title>Admin - Operations</title>
      </Head>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div>
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
