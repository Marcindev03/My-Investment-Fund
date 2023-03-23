import { Entity, RootResponse } from "types";
import { UsersPermissionsUser } from "./usersPermissionUser";

export type Client = Entity<{
  baseCurrencyValue: number;
  users_permissions_user: UsersPermissionsUser;
}>;

export type ClientsResponse = RootResponse<Client>;
