import { Confirmation, RootResponse } from "types";

export type Investment = {
  id: number;
  attributes: {
    amount: number;
    currency: string;
    exchangeRate: number;
    createdAt: string; // ISO string
    date: string; // ISO string
    updatedAt: string; // ISO string
  } & Confirmation;
};

export type InvestmentResponse = RootResponse<Investment>;
