import { FC, ReactNode } from "react";
import ClassNames from "classnames";

type TableContainerProps = {
  placeholderText: string;
  isEmpty?: boolean;
  color?: "light" | "dark";
  children: ReactNode;
};

export const TableContainer: FC<TableContainerProps> = ({
  placeholderText,
  isEmpty,
  color = "light",
  children,
}) => {
  if (isEmpty)
    return (
      <section
        className={ClassNames(
          "relative font-medium text-xl w-full mb-6 rounded  flex flex-col justify-center items-center h-80"
        )}
      >
        <p className="mb-4">{placeholderText}</p>
      </section>
    );

  return <>{children}</>;
};
