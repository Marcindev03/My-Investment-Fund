import { FC, ReactNode, useState } from "react";
import ClassNames from "classnames";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

type AdminProps = {
  children: ReactNode;
};

const Admin: FC<AdminProps> = ({ children }) => {
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
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
};

export default Admin;
