import type { FC } from "react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { BsFillExclamationCircleFill } from "react-icons/bs";

type ErrorCardProps = {
  error?: FetchBaseQueryError;
};

export const ErrorCard: FC<ErrorCardProps> = ({ error }) => {
  return (
    <p className="flex justify-center items-center">
      <BsFillExclamationCircleFill className="mr-2 text-red-600" />
      <span className="font-medium">Network Error</span>
    </p>
  );
};
