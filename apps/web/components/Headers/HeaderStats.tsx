import CardStats from "components/Cards/CardStats";
import { FC } from "react";
import { BASE_CURRENCY } from "ui/constants";

type HeaderStatsProps = {
  baseCurrencyValue: number;
};

const HeaderStats: FC<HeaderStatsProps> = ({ baseCurrencyValue }) => {
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
              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="NEW USERS"
                  statValue="2,356"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="SALES"
                  statValue="924"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PERFORMANCE"
                  statValue="49,65%"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderStats;
