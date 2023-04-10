import {
  Confirmation,
  Entity,
  ArrayResponse,
  Currency,
  SingleEntityResponse,
} from "types";

export type Investment = Entity<
  {
    amount: number;
    currency: SingleEntityResponse<Currency>;
    exchangeRate: number;
    date: string; // ISO string
  } & Confirmation
>;

export type InvestmentsResponse = ArrayResponse<Investment>;
