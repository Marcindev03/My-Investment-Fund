import Admin from "layouts/Admin";
import Head from "next/head";
import { wrapper } from "store";
import {
  getInvestmentsRequests,
  getOperationsRequests,
  getRunningQueriesThunk,
} from "store/features/requests/requestsApiSlice";
import { InvestmentsTable } from "modules/investments";
import { OperationsTable } from "modules/operations";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Admin - Requests</title>
      </Head>
      <div className="grid grid-cols-1 gap-y-4 mt-4">
        <OperationsTable title="Operations To Confirm" showConfirmButton />
        <InvestmentsTable
          title="Investments To Confirm"
          color="dark"
          showConfirmButton
        />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getInvestmentsRequests.initiate());
    store.dispatch(getOperationsRequests.initiate());

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

Dashboard.layout = Admin;
