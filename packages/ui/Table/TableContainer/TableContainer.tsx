import { FC, ReactNode } from "react";
import ClassNames from "classnames";
import { BsFillExclamationCircleFill } from "react-icons/bs";

type TableContainerProps = {
  placeholderText: string;
  isEmpty?: boolean;
  color?: "light" | "dark";
  isError?: boolean;
  errorMessage?: string;
  onRefreshButtonClick?: () => void;
  children: ReactNode;
};

export const TableContainer: FC<TableContainerProps> = ({
  placeholderText,
  isEmpty,
  color = "light",
  isError,
  errorMessage,
  children,
}) => {
  if (isError) {
    return (
      <section
        className={ClassNames(
          "relative font-medium text-xl w-full mb-6 rounded  flex flex-col justify-center items-center h-80",
          {
            "bg-white": color === "light",
            "bg-blueGray-700 text-white": color === "dark",
          }
        )}
      >
        <p className="mb-4 flex justify-center items-center">
          <BsFillExclamationCircleFill className="mr-4 text-red-600" />
          <span>{errorMessage}</span>
        </p>
      </section>
    );
  }

  if (isEmpty)
    return (
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
    );

  return <>{children}</>;
};
