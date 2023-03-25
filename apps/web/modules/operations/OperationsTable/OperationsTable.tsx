import { FC } from "react";
import { Operation } from "types";
import { BASE_CURRENCY } from "ui/constants";
import ClassNames from "classnames";
import { Button } from "ui";

const TABLE_COLUMNS = [
  {
    name: "Amount",
  },
  {
    name: "Type",
  },
  {
    name: "Date",
  },
  {
    name: "User",
  },
  {
    name: "User Confirmed",
  },
  {
    name: "Admin Confirmed",
  },
];

type OperationsTableProps = {
  operations: Operation[];
  title?: string;
  color?: "light" | "dark";
  onRequestButtonClick?: () => void;
};

export const OperationsTable: FC<OperationsTableProps> = ({
  operations,
  title = "Operations",
  color = "light",
  onRequestButtonClick,
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
            {!!onRequestButtonClick && (
              <div>
                <Button primary onClick={onRequestButtonClick}>
                  Request Operation
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {TABLE_COLUMNS.map(({ name }) => (
                  <th
                    key={`operation_table_column_${name}`}
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
              {operations.map(
                ({
                  id,
                  attributes: {
                    amount,
                    type,
                    date,
                    userConfirmed,
                    adminConfirmed,
                  },
                }) => (
                  <tr key={`operations_table_item_${id}`}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {amount} {BASE_CURRENCY}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {type}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {date}
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
                      <i
                        className={ClassNames("fas fa-circle mr-2", {
                          "text-orange-500": !userConfirmed,
                          "text-green-500": userConfirmed,
                        })}
                      ></i>{" "}
                      {userConfirmed ? "confirmed" : "pending"}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <i
                        className={ClassNames("fas fa-circle mr-2", {
                          "text-orange-500": !adminConfirmed,
                          "text-green-500": adminConfirmed,
                        })}
                      ></i>{" "}
                      {adminConfirmed ? "confirmed" : "pending"}
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

export default OperationsTable;
