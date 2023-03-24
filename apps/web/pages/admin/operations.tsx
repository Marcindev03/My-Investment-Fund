import Admin from "layouts/Admin";
import Head from "next/head";
import { useModal } from "ui";
import { wrapper } from "store";
import {
  getOperations,
  getRunningQueriesThunk,
  useAddOperationMutation,
  useGetOperationsQuery,
} from "store/features/operations/operationsApiSlice";
import { OperationsTable } from "modules/operations";
import { OperationModal } from "modules/operations/OperationModal";
import { OperationType } from "types";

export default function Dashboard() {
  const { data } = useGetOperationsQuery();
  const [addOperation] = useAddOperationMutation();

  const { isOpen, onClose, onOpen } = useModal();

  const handleAddNewOperation = (
    amount: number,
    operationType: OperationType,
    clientId: string
  ) => {
    addOperation({
      amount,
      type: operationType,
      clientId: +clientId,
    });
  };

  return (
    <>
      <Head>
        <title>Admin - Operations</title>
      </Head>
      <div className="flex flex-wrap mt-4">
        <OperationsTable
          operations={data?.data.slice(0, 10) ?? []}
          onRequestButtonClick={onOpen}
        />
        <OperationModal
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleAddNewOperation}
        />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getOperations.initiate());

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

Dashboard.layout = Admin;
