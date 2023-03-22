import { MetaResponseType } from "types";

type OperationType = "deposit" | "withdrawal";

export type Operation = {
  id: number;
  attributes: {
    amount: number;
    type: OperationType;
    adminConfirmed: boolean;
    createdAt: string; // ISO string
    date: string; // ISO string
    updatedAt: string; // ISO string
    userConfirmed: boolean;
  };
};

export type OperationsResponseType = {
  data: Operation[];
  meta: MetaResponseType;
};
