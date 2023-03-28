import Head from "next/head";
import Admin from "layouts/Admin";
import ClientsTable from "modules/clients/ClientsTable/ClientsTable";
import { wrapper } from "store";
import {
  getClients,
  getRunningQueriesThunk,
  useAddClientMutation,
  useGetClientsQuery,
} from "store/features/clients/clientsApiSlice";
import { ClientModal } from "modules/clients/ClientModal";
import { useModal } from "ui";
import { useRegisterUserMutation } from "store/features/auth/authApiSlice";

export default function Clients() {
  const { data } = useGetClientsQuery();
  const [registerUser] = useRegisterUserMutation();
  const [addClient] = useAddClientMutation();

  const { isOpen, onClose, onOpen } = useModal();

  const handleAddClient = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    const {
      user: { id: userId },
    } = await registerUser({
      firstName,
      lastName,
      email,
      password,
    }).unwrap();

    await addClient(userId).unwrap();
  };

  return (
    <>
      <Head>
        <title>Admin - Clients</title>
      </Head>
      <div className="flex flex-wrap mt-4">
        <ClientsTable
          clients={data?.data.slice(0, 10) ?? []}
          onAddClientButtonClick={onOpen}
        />
        <ClientModal
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleAddClient}
        />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getClients.initiate());

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

Clients.layout = Admin;
