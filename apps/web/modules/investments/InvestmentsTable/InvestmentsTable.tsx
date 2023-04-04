import { FC } from "react";
import { Investment, TableProps } from "types";
import ClassNames from "classnames";
import { Button, WithEmptyTable } from "ui";
import { InvestmentsTableColumn, InvestmentsTableRow } from "./components";

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
  isLoading = false,
  onRequestButtonClick,
  onConfirmButtonClick,
}) => {
  return (
    <WithEmptyTable
      placeholderText="No investments to confirm"
      isEmpty={!investments.length}
      color={color}
    >
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
            <tbody
              className={ClassNames({
                "animate-pulse": isLoading,
              })}
            >
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
                  <InvestmentsTableRow
                    key={`investments_table_row_${id}`}
                    id={id}
                    amount={amount}
                    currency={currency}
                    exchangeRate={exchangeRate}
                    date={date}
                    userConfirmed={userConfirmed}
                    adminConfirmed={adminConfirmed}
                    isLoading={isLoading}
                    onConfirmButtonClick={onConfirmButtonClick}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </WithEmptyTable>
  );
};

export default InvestmentsTable;
