import { FC } from "react";
import ClassNames from "classnames";
import {
  Button,
  RowEntityWrapper,
  SkeletonButton,
  SkeletonCircle,
  SkeletonRectangle,
} from "ui";
import { BASE_CURRENCY } from "ui/constants";

const skeletonPattern = [
  "rectangle",
  "rectangle",
  "rectangle",
  "rectangle",
  "circle",
  "rectangle",
  "rectangle",
  "button",
];

type InvestmentsTableRowProps = {
  id: number;
  amount: number;
  currency: string;
  exchangeRate: number;
  date: string;
  userConfirmed: boolean;
  adminConfirmed: boolean;
  color?: "dark" | "light";
  isLoading?: boolean;
  onConfirmButtonClick?: (id: number) => void;
};

export const InvestmentsTableRow: FC<InvestmentsTableRowProps> = ({
  id,
  amount,
  currency,
  exchangeRate,
  date,
  userConfirmed,
  adminConfirmed,
  color = "light",
  isLoading = false,
  onConfirmButtonClick,
}) => {
  const tdStyles =
    "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4";

  if (isLoading)
    return (
      <tr>
        {skeletonPattern.map((value, index) => (
          <td className="px-6 p-4" key={`investments_skeleton_${index}`}>
            <RowEntityWrapper>
              {value === "rectangle" && <SkeletonRectangle />}
              {value === "circle" && <SkeletonCircle />}
              {value === "button" && <SkeletonButton />}
            </RowEntityWrapper>
          </td>
        ))}
      </tr>
    );

  return (
    <tr>
      <td className={tdStyles}>
        <RowEntityWrapper>
          {amount} {BASE_CURRENCY}
        </RowEntityWrapper>
      </td>
      <td className={tdStyles}>
        <RowEntityWrapper>{currency}</RowEntityWrapper>
      </td>
      <td className={tdStyles}>
        <RowEntityWrapper>{exchangeRate}</RowEntityWrapper>
      </td>
      <td className={tdStyles}>
        <RowEntityWrapper>{date}</RowEntityWrapper>
      </td>
      <td className={tdStyles}>
        <RowEntityWrapper>
          <img
            src="/img/team-1-800x800.jpg"
            alt="..."
            className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
          ></img>
        </RowEntityWrapper>
      </td>
      <td className={tdStyles}>
        <RowEntityWrapper>
          <i
            className={ClassNames("fas fa-circle mr-2", {
              "text-orange-500": !userConfirmed,
              "text-green-500": userConfirmed,
            })}
          ></i>{" "}
          {userConfirmed ? "confirmed" : "pending"}
        </RowEntityWrapper>
      </td>
      <td className={tdStyles}>
        <RowEntityWrapper>
          <i
            className={ClassNames("fas fa-circle mr-2", {
              "text-orange-500": !adminConfirmed,
              "text-green-500": adminConfirmed,
            })}
          ></i>{" "}
          {adminConfirmed ? "confirmed" : "pending"}
        </RowEntityWrapper>
      </td>
      {!!onConfirmButtonClick && (
        <td className={tdStyles}>
          <RowEntityWrapper>
            <Button
              size="sm"
              primary={color !== "dark"}
              onClick={() => onConfirmButtonClick(id)}
            >
              Confirm
            </Button>
          </RowEntityWrapper>
        </td>
      )}
    </tr>
  );
};
