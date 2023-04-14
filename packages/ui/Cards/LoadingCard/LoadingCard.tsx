import { FC } from "react";
import { SkeletonCircle, SkeletonRectangle } from "../../Skeleton";

export const LoadingCard: FC = () => {
  return (
    <div className="animate-pulse flex justify-between items-center">
      <div className="grid gap-y-4">
        <SkeletonRectangle className="w-40 h-4" />
        <SkeletonRectangle className="w-24" />
      </div>
      <SkeletonCircle className="w-12 h-12" />
    </div>
  );
};
