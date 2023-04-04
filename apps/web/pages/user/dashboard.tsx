import Admin from "layouts/Admin";
import Head from "next/head";
import dynamic from "next/dynamic";

const DynamicCardLineChart = dynamic(
  () => import("components/Cards/CardLineChart")
);
const DynamicCardBarChart = dynamic(
  () => import("components/Cards/CardBarChart")
);
const DynamicCardPageVisits = dynamic(
  () => import("components/Cards/CardPageVisits")
);
const DynamicCardSocialTraffic = dynamic(
  () => import("components/Cards/CardSocialTraffic")
);

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>User - Dashboard</title>
      </Head>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <DynamicCardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <DynamicCardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <DynamicCardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <DynamicCardSocialTraffic />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;
