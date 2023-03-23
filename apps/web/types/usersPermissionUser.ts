import { Entity } from "types";

export type UsersPermissionsUser = Entity<{
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  firstName: string;
  lastName: string;
}>;
