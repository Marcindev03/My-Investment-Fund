import { Entity, ArrayResponse } from "types";

export type Currency = Entity<{
  name: string;
  symbol: string;
  value: string;
}>;

export type CurrenciesResponse = ArrayResponse<Currency>;
