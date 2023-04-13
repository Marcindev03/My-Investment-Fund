import { FC } from "react";

type OperationsTableColumnProps = {
  name: string;
  color: string;
};

export const OperationsTableColumn: FC<OperationsTableColumnProps> = ({
  name,
  color,
}) => (
  <th
    className={
      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center" +
      (color === "light"
        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
        : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
    }
  >
    {name}
  </th>
);
