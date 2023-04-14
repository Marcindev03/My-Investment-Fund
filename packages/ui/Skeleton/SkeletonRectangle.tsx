import { FC } from "react";
import ClassNames from "classnames";

type SkeletonRectangleProps = {
  className?: string;
};

export const SkeletonRectangle: FC<SkeletonRectangleProps> = ({
  className,
}) => (
  <div
    className={ClassNames("h-2 w-16 rounded-full bg-gray-400", className)}
  ></div>
);
