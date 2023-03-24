import CardStats from "components/Cards/CardStats";
import { FC } from "react";
import { Currency } from "types";
import { BASE_CURRENCY } from "ui/constants";

type HeaderStatsProps = {
  baseCurrencyValue: number;
  baseCurrencyAmount: number;
  mostValuableCurrencies: Currency[];
};

const HeaderStats: FC<HeaderStatsProps> = ({
  baseCurrencyValue,
  baseCurrencyAmount,
  mostValuableCurrencies,
}) => {
  return (
    <>
      <div className="relative bg-blueGray-800 md:pt-16 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="BASE CURRENCY VALUE"
                  statValue={`${baseCurrencyValue} ${BASE_CURRENCY}`}
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="BASE CURRENCY AMOUNT"
                  statValue={`${baseCurrencyAmount} ${BASE_CURRENCY}`}
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              {mostValuableCurrencies.map(
                ({ attributes: { name, symbol, value } }) => (
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <CardStats
                      statSubtitle={`${name} VALUE`}
                      statValue={`${value} ${symbol}`}
                      statIconName="fas fa-users"
                      statIconColor="bg-pink-500"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderStats;
