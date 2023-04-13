import { FC, useMemo } from "react";
import { TableProps } from "types";
import ClassNames from "classnames";
import { Button, Card, TableContainer, useModal } from "ui";
import { toast, ToastContainer } from "react-toastify";
import { InvestmentsTableColumn, InvestmentsTableRow } from "./components";
import { InvestmentModal } from "../InvestmentModal";
import {
  useGetInvestmentsQuery,
  useAddInvestmentMutation,
  AddInvestmentArgs,
} from "store/features/investments/investmentsApiSlice";
import { useConfirmInvestmentRequestMutation } from "store/features/requests/requestsApiSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

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

type InvestmentsTableProps = {} & TableProps;

export const InvestmentsTable: FC<InvestmentsTableProps> = ({
  title = "Investments",
  color = "light",
  showConfirmButton,
  showRequestButton,
}) => {
  const { data, error, isFetching } = useGetInvestmentsQuery();
  const [addInvestment, { isLoading }] = useAddInvestmentMutation();
  const [confirmInvestmentRequest, { isLoading: isConfirmLoading }] =
    useConfirmInvestmentRequestMutation();

  const { isOpen, onClose, onOpen } = useModal();

  const handleAddNewInvestment = async (obj: AddInvestmentArgs) => {
    try {
      await addInvestment(obj);
      toast.success("Successfully requested investment");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleInvestmentConfirm = async (id: number) => {
    try {
      await confirmInvestmentRequest(id);
      toast.success(`Successfully confirmed investment ${id}`);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const investments = useMemo(() => data?.data ?? [], [data]);

  const isTableLoading = useMemo(
    () => isFetching || isLoading || isConfirmLoading,
    [isFetching, isLoading, isConfirmLoading]
  );

  return (
    <>
      <Card variant={color} error={error as FetchBaseQueryError}>
        <TableContainer
          placeholderText="No investments to confirm"
          isEmpty={!investments.length}
          color={color}
        >
          <div className={"flex flex-col break-words"}>
            <div className="mb-0 pb-4">
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
                {!!showRequestButton && (
                  <div>
                    <Button primary onClick={onOpen}>
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
                          !!showConfirmButton && (
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
                    "animate-pulse": isTableLoading,
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
                        currency={currency.data.attributes.symbol}
                        exchangeRate={exchangeRate}
                        date={date}
                        userConfirmed={userConfirmed}
                        adminConfirmed={adminConfirmed}
                        isLoading={isTableLoading}
                        onConfirmButtonClick={handleInvestmentConfirm}
                      />
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TableContainer>
      </Card>
      <ToastContainer
        position="bottom-center"
        hideProgressBar
        autoClose={2000}
      />
      <InvestmentModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleAddNewInvestment}
      />
    </>
  );
};

export default InvestmentsTable;
