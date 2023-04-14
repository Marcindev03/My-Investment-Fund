import type { FC, ReactNode } from "react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { CardContainer } from "../CardContainer";
import { ErrorCard } from "../ErrorCard";
import { LoadingCard } from "../LoadingCard";

type CardProps = {
  variant?: "light" | "dark";
  error?: FetchBaseQueryError;
  errorCardClassName?: string;
  isLoading?: boolean;
  children: ReactNode;
};

export const Card: FC<CardProps> = ({
  variant = "light",
  error,
  errorCardClassName,
  isLoading = false,
  children,
}) => {
  return (
    <CardContainer variant={variant}>
      {isLoading ? (
        <LoadingCard />
      ) : (
        error && <ErrorCard variant={variant} className={errorCardClassName} />
      )}
      {!error && !isLoading && <>{children}</>}
    </CardContainer>
  );
};
