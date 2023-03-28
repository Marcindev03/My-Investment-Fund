import { Entity, SingleResponse } from "types";

export type UsersPermissionsUser = Entity<{
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  firstName: string;
  lastName: string;
}>;

export type UsersPermissionsUserResponse = SingleResponse<UsersPermissionsUser>;
