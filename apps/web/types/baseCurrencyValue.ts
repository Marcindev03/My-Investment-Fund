import { Entity, SingleResponse } from "types";

export type BaseCurrencyValue = Entity<{
  value: number;
}>;

export type BaseCurrencyValueResponse = SingleResponse<BaseCurrencyValue>;
