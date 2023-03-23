import { Confirmation, Entity, RootResponse } from "types";

export type Investment = Entity<
  {
    amount: number;
    currency: string;
    exchangeRate: number;
    date: string; // ISO string
  } & Confirmation
>;

export type InvestmentsResponse = RootResponse<Investment>;
