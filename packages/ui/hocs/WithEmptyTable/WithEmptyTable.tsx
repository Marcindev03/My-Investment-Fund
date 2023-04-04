import { FC, ReactNode } from "react";
import ClassNames from "classnames";

type WithEmptyTableProps = {
  placeholderText: string;
  isEmpty?: boolean;
  color?: "light" | "dark";
  onRefreshButtonClick?: () => void;
  children: ReactNode;
};

export const WithEmptyTable: FC<WithEmptyTableProps> = ({
  placeholderText,
  isEmpty,
  color = "light",
  children,
}) => (
  <>
    {isEmpty ? (
      <section
        className={ClassNames(
          "relative font-medium text-xl w-full mb-6 rounded  flex flex-col justify-center items-center h-80",
          {
            "bg-white": color === "light",
            "bg-blueGray-700 text-white": color === "dark",
          }
        )}
      >
        <p className="mb-4">{placeholderText}</p>
      </section>
    ) : (
      children
    )}
  </>
);
