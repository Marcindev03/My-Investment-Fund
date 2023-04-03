import { FC } from "react";
import { Operation, TableProps } from "types";
import ClassNames from "classnames";
import { Button } from "ui";
import { OperationsTableColumn } from "./components";
import { OperationsTableRow } from "./components/OperationsTableRow";

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
  {
    name: "Actions",
  },
];

type OperationsTableProps = {
  operations: Operation[];
} & TableProps;

export const OperationsTable: FC<OperationsTableProps> = ({
  operations,
  title = "Operations",
  color = "light",
  isLoading = false,
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
                  <>
                    {name !== "Actions" ? (
                      <OperationsTableColumn
                        key={`operations_table_column_${name}`}
                        name={name}
                        color={color}
                      />
                    ) : (
                      !!onConfirmButtonClick && (
                        <OperationsTableColumn
                          key={`operations_table_column_${name}`}
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
                  <OperationsTableRow
                    key={`operations_table_item_${id}`}
                    id={id}
                    amount={amount}
                    type={type}
                    date={date}
                    color={color}
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
    </>
  );
};

export default OperationsTable;
