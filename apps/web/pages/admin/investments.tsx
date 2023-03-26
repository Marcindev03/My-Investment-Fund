import Admin from "layouts/Admin";
import { InvestmentModal, InvestmentsTable } from "modules/investments";
import Head from "next/head";
import { wrapper } from "store";
import {
  getInvestments,
  getRunningQueriesThunk,
  useAddInvestmentMutation,
  useGetInvestmentsQuery,
} from "store/features/investments/investmentsApiSlice";
import { useModal } from "ui";

export default function Dashboard() {
  const { data } = useGetInvestmentsQuery();
  const [addInvestment] = useAddInvestmentMutation();

  const { isOpen, onClose, onOpen } = useModal();

  const handleAddNewInvestment = (
    amount: number,
    exchangeRate: number,
    clientId: number,
    currencyId: number
  ) => {
    addInvestment({ amount, exchangeRate, clientId, currencyId });
  };

  return (
    <>
      <Head>
        <title>Admin - Investments</title>
      </Head>
      <div className="flex flex-wrap mt-4">
        <InvestmentsTable
          investments={data?.data.slice(0, 10) ?? []}
          onRequestButtonClick={onOpen}
        />
        <InvestmentModal
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleAddNewInvestment}
        />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getInvestments.initiate());

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

Dashboard.layout = Admin;
