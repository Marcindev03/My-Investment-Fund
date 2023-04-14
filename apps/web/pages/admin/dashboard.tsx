import CardLineChart from "components/Cards/CardLineChart";
import CardBarChart from "components/Cards/CardBarChart";
import CardPageVisits from "components/Cards/CardPageVisits";
import CardSocialTraffic from "components/Cards/CardSocialTraffic";
import Admin from "layouts/Admin";
import Head from "next/head";
import { wrapper } from "store";
import {
  getBaseCurrencyAmount,
  getBaseCurrencyValue,
  getMostValuableCurrencies,
  getRunningQueriesThunk,
} from "store/features/dashboard/dashboardApiSlice";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Admin - Dashboard</title>
      </Head>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 gap-y-6">
        <CardLineChart />
        <CardBarChart />
        <CardPageVisits />
        <CardSocialTraffic />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getBaseCurrencyValue.initiate());
    store.dispatch(getBaseCurrencyAmount.initiate());
    store.dispatch(getMostValuableCurrencies.initiate());

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

Dashboard.layout = Admin;
