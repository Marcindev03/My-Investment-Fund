import { FC, ReactNode } from "react";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

type AdminProps = {
  children: ReactNode;
};

const Admin: FC<AdminProps> = ({ children }) => (
  <>
    <Sidebar />
    <div className="relative md:ml-64 bg-blueGray-100 min-h-screen">
      <AdminNavbar />
      {/* Header */}
      <HeaderStats />
      <div className="px-4 md:px-10 mx-auto w-full -m-24">
        {children}
        <FooterAdmin />
      </div>
    </div>
  </>
);

export default Admin;
