import { Entity, SingleResponse } from "types";

export type BaseCurrencyAmount = Entity<{
  value: number;
}>;

export type BaseCurrencyAmountResponse = SingleResponse<BaseCurrencyAmount>;
