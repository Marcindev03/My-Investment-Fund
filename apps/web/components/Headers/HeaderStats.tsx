import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import CardStats from "components/Cards/CardStats";
import { FC } from "react";
import {
  useGetBaseCurrencyValueQuery,
  useGetBaseCurrencyAmountQuery,
  useGetMostValuableCurrenciesQuery,
} from "store/features/dashboard/dashboardApiSlice";
import { BASE_CURRENCY } from "ui/constants";

type HeaderStatsProps = {};

const HeaderStats: FC<HeaderStatsProps> = ({}) => {
  const { data: baseCurrencyValueData, error: baseCurrencyValueError } =
    useGetBaseCurrencyValueQuery();
  const { data: baseCurrencyAmountData, error: baseCurrencyAmountError } =
    useGetBaseCurrencyAmountQuery();
  const {
    data: mostValuableCurrenciesData,
    error: mostValuableCurrenciesError,
  } = useGetMostValuableCurrenciesQuery();

  const firstCurrency = mostValuableCurrenciesData?.data[0]?.attributes;

  const secondCurrency = mostValuableCurrenciesData?.data[1]?.attributes;

  return (
    <>
      <div className="relative bg-blueGray-800 md:pt-16 pb-32 pt-12">
        <div className="md:px-10 mx-auto w-full">
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              <CardStats
                statSubtitle="BASE CURRENCY VALUE"
                statValue={`${baseCurrencyValueData?.data.attributes.value} ${BASE_CURRENCY}`}
                statIconName="far fa-chart-bar"
                statIconColor="bg-red-500"
                error={baseCurrencyValueError as FetchBaseQueryError}
              />
              <CardStats
                statSubtitle="BASE CURRENCY AMOUNT"
                statValue={`${baseCurrencyAmountData?.data.attributes.value} ${BASE_CURRENCY}`}
                statIconName="far fa-chart-bar"
                statIconColor="bg-red-500"
                error={baseCurrencyAmountError as FetchBaseQueryError}
              />
              <CardStats
                statSubtitle={`${firstCurrency?.name} VALUE`}
                statValue={`${firstCurrency?.value} ${firstCurrency?.symbol}`}
                statIconName="fas fa-users"
                statIconColor="bg-pink-500"
                error={mostValuableCurrenciesError as FetchBaseQueryError}
              />
              <CardStats
                statSubtitle={`${secondCurrency?.name} VALUE`}
                statValue={`${secondCurrency?.value} ${secondCurrency?.symbol}`}
                statIconName="fas fa-users"
                statIconColor="bg-pink-500"
                error={mostValuableCurrenciesError as FetchBaseQueryError}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderStats;
