import { FC } from "react";
import { Investment, TableProps } from "types";
import ClassNames from "classnames";
import { Button } from "ui";
import { InvestmentsTableColumn } from "./components";

const TABLE_COLUMNS = [
  {
    name: "Amount",
  },
  {
    name: "Currency",
  },
  {
    name: "Exchange Rate",
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
  {
    name: "Actions",
  },
];

type InvestmentsTableProps = {
  investments: Investment[];
} & TableProps;

export const InvestmentsTable: FC<InvestmentsTableProps> = ({
  investments,
  title = "Investments",
  color = "light",
  onRequestButtonClick,
  onConfirmButtonClick,
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
                  Request Investment
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
                  <>
                    {name !== "Actions" ? (
                      <InvestmentsTableColumn
                        key={`investments_table_column_${name}`}
                        name={name}
                        color={color}
                      />
                    ) : (
                      !!onConfirmButtonClick && (
                        <InvestmentsTableColumn
                          key={`investments_table_column_${name}`}
                          name={name}
                          color={color}
                        />
                      )
                    )}
                  </>
                ))}
              </tr>
            </thead>
            <tbody>
              {investments.map(
                ({
                  id,
                  attributes: {
                    amount,
                    currency,
                    exchangeRate,
                    date,
                    userConfirmed,
                    adminConfirmed,
                  },
                }) => (
                  <tr key={`investments_table_item_${id}`}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {amount}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {currency}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {exchangeRate}
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
                    {!!onConfirmButtonClick && (
                      <td className="p-3 w-28">
                        <Button
                          size="sm"
                          primary={color !== "dark"}
                          onClick={() => onConfirmButtonClick(id)}
                        >
                          Confirm
                        </Button>
                      </td>
                    )}
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

export default InvestmentsTable;
