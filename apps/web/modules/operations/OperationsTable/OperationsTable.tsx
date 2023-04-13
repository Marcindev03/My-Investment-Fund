import { FC } from "react";
import { TableProps } from "types";
import ClassNames from "classnames";
import { Button, useModal, TableContainer, Card } from "ui";
import { OperationsTableColumn } from "./components";
import { OperationsTableRow } from "./components/OperationsTableRow";
import {
  useConfirmOperationRequestMutation,
  useGetOperationsRequestsQuery,
} from "store/features/requests/requestsApiSlice";
import { ToastContainer, toast } from "react-toastify";
import {
  AddOperationArgs,
  useAddOperationMutation,
} from "store/features/operations/operationsApiSlice";
import { OperationModal } from "../OperationModal";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

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

type OperationsTableProps = {} & TableProps;

export const OperationsTable: FC<OperationsTableProps> = ({
  title = "Operations",
  color = "light",
  showConfirmButton,
  showRequestButton,
}) => {
  const { data, isFetching, error } = useGetOperationsRequestsQuery();

  const [confirmOperationRequest, { isLoading }] =
    useConfirmOperationRequestMutation();
  const [addOperation, { isLoading: isAddOperationLoading }] =
    useAddOperationMutation();

  const { isOpen, onOpen, onClose } = useModal();

  const handleOperationConfirm = async (id: number) => {
    try {
      await confirmOperationRequest(id).unwrap();
      toast.success(`Successfully confirmed operation ${id}`);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleAddOperation = async (obj: AddOperationArgs) => {
    try {
      await addOperation(obj).unwrap();
      toast.success("Successfully requested operation");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const isTableLoading = isFetching || isLoading || isAddOperationLoading;

  return (
    <>
      <Card variant={color} error={error as FetchBaseQueryError}>
        <TableContainer
          placeholderText="No operations to confirm"
          isEmpty={!data?.data.length}
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
                          !!showConfirmButton && (
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
                    "animate-pulse": isTableLoading,
                  })}
                >
                  {data?.data.map(
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
                        isLoading={isTableLoading}
                        onConfirmButtonClick={
                          showConfirmButton ? handleOperationConfirm : undefined
                        }
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
      <OperationModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleAddOperation}
      />
    </>
  );
};

export default OperationsTable;
