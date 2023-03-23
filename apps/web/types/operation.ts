import { Confirmation, Entity, RootResponse } from "types";

export type OperationType = "deposit" | "withdrawal";

export type Operation = Entity<
  {
    amount: number;
    type: OperationType;
    date: string; // ISO string
  } & Confirmation
>;

export type OperationsResponse = RootResponse<Operation>;
