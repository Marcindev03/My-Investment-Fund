export * from "./operation";
export * from "./investment";
export * from "./client";
export * from "./usersPermissionUser";
export * from "./baseCurrencyAmount";
export * from "./baseCurrencyValue";
export * from "./currency";

import { IconType } from "react-icons";

export type SidebarItem = {
  href: string;
  text: string;
  Icon: IconType;
};

export type Entity<T> = {
  id: number;
  attributes: {
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
  } & T;
};

type ResponseMeta = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
};

export type ArrayResponse<T> = {
  data: T[];
  meta: ResponseMeta;
};

export type SingleResponse<T> = {
  data: T;
  meta: ResponseMeta;
};

export type ArrayEntityResponse<T> = {
  data: T[];
};

export type SingleEntityResponse<T> = {
  data: T;
};

export type Confirmation = {
  adminConfirmed: boolean;
  userConfirmed: boolean;
};

export type TableProps = {
  title?: string;
  color?: "light" | "dark";
  isLoading?: boolean;
  showConfirmButton?: boolean;
  showRequestButton?: boolean;
};
