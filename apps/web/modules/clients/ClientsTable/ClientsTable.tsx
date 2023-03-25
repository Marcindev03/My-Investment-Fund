import { FC } from "react";
import { Client } from "types/client";
import { BASE_CURRENCY } from "ui/constants";

const TABLE_COLUMNS = [
  {
    name: "First Name",
  },
  {
    name: "Last Name",
  },
  {
    name: "Email",
  },
  {
    name: "Photo",
  },
  {
    name: "Base Currency Value",
  },
];

type ClientsTableProps = {
  clients: Client[];
  title?: string;
  color?: "light" | "dark";
};

export const ClientsTable: FC<ClientsTableProps> = ({
  clients,
  title = "Clients",
  color = "light",
}) => {
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                {title}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {TABLE_COLUMNS.map(({ name }) => (
                  <th
                    key={`clients_table_column_${name}`}
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                    }
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map(
                ({
                  id,
                  attributes: {
                    baseCurrencyValue,
                    users_permissions_user: {
                      data: {
                        attributes: { firstName, lastName, email },
                      },
                    },
                  },
                }) => (
                  <tr key={`clients_table_item-${id}`}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {firstName}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {lastName}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {email}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex">
                        <img
                          src="/img/team-1-800x800.jpg"
                          alt="..."
                          className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                        ></img>
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {baseCurrencyValue} {BASE_CURRENCY}
                    </td>
                    {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                      <TableDropdown />
                    </td> */}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ClientsTable;
