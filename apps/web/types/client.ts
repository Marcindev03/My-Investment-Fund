import { Entity, ArrayResponse, SingleResponse } from "types";
import { UsersPermissionsUser } from "./usersPermissionUser";

export type Client = Entity<{
  baseCurrencyValue: number;
  users_permissions_user: {
    data: UsersPermissionsUser;
  };
}>;

export type ClientsResponse = ArrayResponse<Client>;

export type ClientResponse = SingleResponse<Client>;
