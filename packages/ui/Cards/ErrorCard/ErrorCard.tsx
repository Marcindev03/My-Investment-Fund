import type { FC } from "react";
import ClassNames from "classnames";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { BsFillExclamationCircleFill } from "react-icons/bs";

type ErrorCardProps = {
  variant?: "light" | "dark";
  error?: FetchBaseQueryError;
  className?: string;
};

export const ErrorCard: FC<ErrorCardProps> = ({
  error,
  className,
  variant = "light",
}) => {
  return (
    <div
      className={ClassNames(
        "flex justify-center items-center",
        {
          "text-white": variant === "dark",
        },
        className
      )}
    >
      <BsFillExclamationCircleFill className="mr-2 text-red-600" />
      <span className="font-medium">Network Error</span>
    </div>
  );
};
