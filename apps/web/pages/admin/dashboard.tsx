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
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
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
