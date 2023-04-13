import { ClientsResponse } from "types";

export const transformGetClientsResponse = (res: ClientsResponse) => {
  const result =
    res.data.map(({ id, attributes }) => ({
      id,
      ...attributes,
      users_permissions_user: {
        id: attributes.users_permissions_user.data.id,
        ...attributes.users_permissions_user.data.attributes,
      },
    })) ?? [];

  return result;
};
