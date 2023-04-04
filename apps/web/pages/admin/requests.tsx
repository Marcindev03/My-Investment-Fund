import Admin from "layouts/Admin";
import Head from "next/head";
import { wrapper } from "store";
import {
  getInvestmentsRequests,
  getOperationsRequests,
  getRunningQueriesThunk,
  useConfirmInvestmentRequestMutation,
  useGetInvestmentsRequestsQuery,
} from "store/features/requests/requestsApiSlice";
import { InvestmentsTable } from "modules/investments";
import { OperationsTable } from "modules/operations";

export default function Dashboard() {
  const {
    data: investmentsRequests,
    isFetching: isInvestmentsRequestsFetching,
  } = useGetInvestmentsRequestsQuery();
  const [confirmInvestmentRequest, { isLoading: isConfirmInvestmentLoading }] =
    useConfirmInvestmentRequestMutation();

  const handleConfirmInvestmentRequest = (investmentId: number) =>
    confirmInvestmentRequest(investmentId);

  return (
    <>
      <Head>
        <title>Admin - Requests</title>
      </Head>
      <div className="flex flex-wrap mt-4">
        <OperationsTable title="Operations To Confirm" showConfirmButton />
        <InvestmentsTable
          title="Investments To Confirm"
          isLoading={
            isInvestmentsRequestsFetching || isConfirmInvestmentLoading
          }
          color="dark"
          investments={investmentsRequests?.data.slice(0, 5) ?? []}
          onConfirmButtonClick={handleConfirmInvestmentRequest}
        />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getInvestmentsRequests.initiate());
    store.dispatch(getOperationsRequests.initiate());

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);

Dashboard.layout = Admin;
