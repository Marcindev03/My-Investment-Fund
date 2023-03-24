import { FC, useState } from "react";
import { useGetClientsQuery } from "store/features/clients/clientsApiSlice";
import { OperationType } from "types";
import { FormControl, NumberInput, Option, Select } from "ui";

export const OperationForm: FC = () => {
  const { data: clients } = useGetClientsQuery();

  const [amount, setAmount] = useState(0);
  const [operationType, setOperationType] = useState<OperationType>("deposit");
  const [clientId, setClientId] = useState("0");

  const availableOperationTypes: Option[] = [
    {
      label: "Deposit",
      value: "deposit",
    },
    {
      label: "Withdrawal",
      value: "withdrawal",
    },
  ];

  const availableClientsIds: Option[] =
    clients?.data.map(
      ({
        attributes: {
          users_permissions_user: {
            data: {
              id,
              attributes: { firstName, lastName },
            },
          },
        },
      }) => ({
        label: `${firstName} ${lastName}`,
        value: id.toString(),
      })
    ) ?? [];

  return (
    <article className="flex-col">
      <FormControl labelTitle={"Amount"}>
        <NumberInput
          placeholder="Enter amount"
          value={amount}
          onChange={setAmount}
        />
      </FormControl>
      <FormControl labelTitle={"Operation Type"}>
        <Select
          placeholder="Choose operation type"
          value={operationType}
          availableOptions={availableOperationTypes}
          onChange={(value) => setOperationType(value as OperationType)}
        />
      </FormControl>
      <FormControl labelTitle={"User"}>
        <Select
          placeholder="Choose user"
          value={clientId}
          availableOptions={availableClientsIds}
          onChange={setClientId}
        />
      </FormControl>
    </article>
  );
};
