import type { FC, ReactNode } from "react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { CardContainer } from "../CardContainer";
import { ErrorCard } from "../ErrorCard";

type CardProps = {
  variant?: "light" | "dark";
  error?: FetchBaseQueryError;
  children: ReactNode;
};

export const Card: FC<CardProps> = ({ variant = "light", error, children }) => {
  return (
    <CardContainer variant={variant}>
      {!error ? <>{children}</> : <ErrorCard variant={variant} />}
    </CardContainer>
  );
};
