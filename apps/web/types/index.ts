export * from "./operation";
export * from "./investment";

import { IconType } from "react-icons";

export type SidebarItem = {
  href: string;
  text: string;
  Icon: IconType;
};

type ResponseMeta = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
};

export type RootResponse<T> = {
  data: T[];
  meta: ResponseMeta;
};

export type Confirmation = {
  adminConfirmed: boolean;
  userConfirmed: boolean;
};
