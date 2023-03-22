import Admin from "layouts/Admin";
import { InvestmentsTable } from "modules/investments";
import Head from "next/head";
import { wrapper } from "store";
import {
  getInvestments,
  getRunningQueriesThunk,
  useGetInvestmentsQuery,
} from "store/features/investments/investmentsApiSlice";

export default function Dashboard() {
  const { data } = useGetInvestmentsQuery();

  return (
    <>
      <Head>
        <title>Admin - Investments</title>
      </Head>
      <div className="flex flex-wrap mt-4">
        <InvestmentsTable investments={data?.data.slice(0, 10) ?? []} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getInvestments.initiate());

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

Dashboard.layout = Admin;
