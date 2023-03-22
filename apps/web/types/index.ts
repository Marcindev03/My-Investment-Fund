export * from "./operation";

import { IconType } from "react-icons";

export type SidebarItem = {
  href: string;
  text: string;
  Icon: IconType;
};

export type MetaResponseType = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
};
