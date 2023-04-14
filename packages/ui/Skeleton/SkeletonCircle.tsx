import { FC } from "react";
import ClassNames from "classnames";

type SkeletonCircleProps = {
  className?: string;
};

export const SkeletonCircle: FC<SkeletonCircleProps> = ({ className }) => (
  <div
    className={ClassNames("h-8 w-8 rounded-full bg-gray-400", className)}
  ></div>
);
