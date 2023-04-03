import { FC, ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import ClassNames from "classnames";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import {
  useGetBaseCurrencyAmountQuery,
  useGetBaseCurrencyValueQuery,
  useGetMostValuableCurrenciesQuery,
} from "store/features/dashboard/dashboardApiSlice";

const DynamicHeaderStats = dynamic(
  () => import("components/Headers/HeaderStats"),
  {
    ssr: false,
  }
);

type AdminProps = {
  children: ReactNode;
};

const Admin: FC<AdminProps> = ({ children }) => {
  const { data: baseCurrencyValueData } = useGetBaseCurrencyValueQuery();
  const { data: baseCurrencyAmountData } = useGetBaseCurrencyAmountQuery();
  const { data: mostValuableCurrenciesData } =
    useGetMostValuableCurrenciesQuery();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <>
      <Sidebar onToogleCollapse={setIsSidebarCollapsed} />
      <div
        className={ClassNames(
          "transition-all relative bg-blueGray-100 min-h-screen",
          {
            "md:ml-20": isSidebarCollapsed,
            "md:ml-64": !isSidebarCollapsed,
          }
        )}
      >
        <AdminNavbar />
        <DynamicHeaderStats
          baseCurrencyValue={baseCurrencyValueData?.data?.attributes.value ?? 0}
          baseCurrencyAmount={
            baseCurrencyAmountData?.data?.attributes?.value ?? 0
          }
          mostValuableCurrencies={mostValuableCurrenciesData?.data ?? []}
        />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
};

export default Admin;
