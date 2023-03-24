import { FC, useMemo, useState } from "react";
import { useGetClientsQuery } from "store/features/clients/clientsApiSlice";
import { OperationType } from "types";
import { FormControl, NumberInput, Option, Select } from "ui";

type OperationFormProps = {
  onSubmit: (
    amount: number,
    operationType: OperationType,
    clientId: string
  ) => void;
  onReject: () => void;
};

export const OperationForm: FC<OperationFormProps> = ({
  onSubmit,
  onReject,
}) => {
  const { data: clients } = useGetClientsQuery();

  const [amount, setAmount] = useState(0);
  const [operationType, setOperationType] = useState<OperationType>("deposit");
  const [clientId, setClientId] = useState<string>("");

  const handleFormSubmit = () => {
    if (isAmountValid && isClientIdValid) {
      onSubmit(amount, operationType, clientId);
    }
  };

  const isAmountValid = useMemo(() => amount > 0, [amount]);
  const isClientIdValid = useMemo(() => clientId !== "", [clientId]);

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
        id,
        attributes: {
          users_permissions_user: {
            data: {
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
    <form className="flex-col">
      <FormControl
        isInvalid={!isAmountValid}
        errorMessage="Amount must be greater than 0"
        labelTitle={"Amount"}
      >
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
      <FormControl
        isInvalid={!isClientIdValid}
        errorMessage="Please choose user"
        labelTitle={"User"}
      >
        <Select
          placeholder="Choose user"
          value={clientId}
          availableOptions={availableClientsIds}
          onChange={setClientId}
        />
      </FormControl>
      <section className="flex items-center justify-end pt-6 rounded-b">
        <button
          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={onReject}
        >
          Close
        </button>
        <button
          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={handleFormSubmit}
        >
          Save
        </button>
      </section>
    </form>
  );
};
