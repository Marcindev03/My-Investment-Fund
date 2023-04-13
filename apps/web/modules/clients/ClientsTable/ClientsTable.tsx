import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { FC, useMemo } from "react";
import ClassNames from "classnames";
import { useRegisterUserMutation } from "store/features/auth/authApiSlice";
import {
  useGetClientsQuery,
  useAddClientMutation,
} from "store/features/clients/clientsApiSlice";
import { TableProps } from "types";
import { Button, Card, TableContainer, useModal } from "ui";
import { BASE_CURRENCY } from "ui/constants";
import { ClientModal } from "../ClientModal";
import { toast, ToastContainer } from "react-toastify";

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

type ClientsTableProps = {} & TableProps;

export const ClientsTable: FC<ClientsTableProps> = ({
  title = "Clients",
  color = "light",
}) => {
  const { data, error, isFetching } = useGetClientsQuery();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [addClient, { isLoading: isAddClientLoading }] = useAddClientMutation();

  const { isOpen, onClose, onOpen } = useModal();

  const handleAddClient = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    try {
      const {
        user: { id: userId },
      } = await registerUser({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();

      await addClient(userId).unwrap();

      toast.success("Successfully added new client");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const isTableLoading = useMemo(
    () => isFetching || isLoading || isAddClientLoading,
    [isFetching, isLoading, isAddClientLoading]
  );

  return (
    <>
      <Card variant={color} error={error as FetchBaseQueryError}>
        <TableContainer
          placeholderText="No clients to show"
          isEmpty={!data?.length}
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
                <div>
                  <Button primary onClick={onOpen}>
                    Add client
                  </Button>
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
                <tbody
                  className={ClassNames({
                    "animate-pulse": isTableLoading,
                  })}
                >
                  {data?.map(
                    ({
                      id,
                      baseCurrencyValue,
                      users_permissions_user: { firstName, lastName, email },
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
        </TableContainer>
      </Card>
      <ToastContainer
        position="bottom-center"
        hideProgressBar
        autoClose={2000}
      />
      <ClientModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleAddClient}
      />
    </>
  );
};

export default ClientsTable;
