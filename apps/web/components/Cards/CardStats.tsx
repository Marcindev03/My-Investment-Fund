import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import type { FC } from "react";
import { Card } from "ui";

type CardStatsProps = {
  statSubtitle: string;
  statValue: string | number;
  statIconName: string;
  statIconColor: string;
  error?: FetchBaseQueryError;
  isLoading?: boolean;
};

const CardStats: FC<CardStatsProps> = ({
  statSubtitle = "Traffic",
  statValue,
  statIconName = "far fa-chart-bar",
  statIconColor = "bg-red-500",
  error,
  isLoading = false,
}) => (
  <Card error={error} isLoading={isLoading}>
    <div className="flex-auto">
      <div className="flex flex-wrap">
        <div className="relative w-full max-w-full flex-grow flex-1">
          <h5 className="text-blueGray-400 uppercase font-bold text-xs">
            {statSubtitle}
          </h5>
          <span className="font-semibold text-xl text-blueGray-700">
            {statValue}
          </span>
        </div>
        <div className="relative w-auto pl-4 flex-initial">
          <div
            className={
              "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
              statIconColor
            }
          >
            <i className={statIconName}></i>
          </div>
        </div>
      </div>
      {/* <p className="text-sm text-blueGray-400 mt-4">
          <span className={statPercentColor + " mr-2"}>
            <i
              className={
                statArrow === "up"
                  ? "fas fa-arrow-up"
                  : statArrow === "down"
                  ? "fas fa-arrow-down"
                  : ""
              }
            ></i>{" "}
            {statPercent}%
          </span>
          <span className="whitespace-nowrap">{statDescripiron}</span>
        </p> */}
    </div>
  </Card>
);

export default CardStats;
