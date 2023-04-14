import { FC, useMemo, useState } from "react";
import { useGetClientsQuery } from "store/features/clients/clientsApiSlice";
import { useGetCurrenciesQuery } from "store/features/currencies/currenciesApiSlice";
import { AddInvestmentArgs } from "store/features/investments/investmentsApiSlice";
import { FormControl, NumberInput, Option, Select } from "ui";

type InvestmentFormProps = {
  onSubmit: (obj: AddInvestmentArgs) => void;
  onReject: () => void;
};

export const InvestmentForm: FC<InvestmentFormProps> = ({
  onSubmit,
  onReject,
}) => {
  const { data: clients } = useGetClientsQuery();
  const { data: currencies } = useGetCurrenciesQuery();

  const [amount, setAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [currencyId, setCurrencyId] = useState<string>("");
  const [clientId, setClientId] = useState<string>("");

  const handleFormSubmit = () => {
    if (
      isAmountValid &&
      isExchangeRateValid &&
      isCurrencyIdValid &&
      isClientIdValid
    ) {
      onSubmit({
        amount,
        exchangeRate,
        clientId: +clientId,
        currencyId: +currencyId,
      });
    }
  };

  const isAmountValid = useMemo(() => amount > 0, [amount]);
  const isExchangeRateValid = useMemo(() => exchangeRate > 0, [exchangeRate]);
  const isCurrencyIdValid = useMemo(() => currencyId !== "", [currencyId]);
  const isClientIdValid = useMemo(() => clientId !== "", [clientId]);

  const availableClientsIds: Option[] =
    clients?.map(
      ({
        id,

        users_permissions_user: { firstName, lastName },
      }) => ({
        label: `${firstName} ${lastName}`,
        value: id.toString(),
      })
    ) ?? [];

  const availableCurrenciesIds: Option[] =
    currencies?.data.map(({ id, attributes: { name } }) => ({
      label: name,
      value: id.toString(),
    })) ?? [];

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
      <FormControl
        isInvalid={!isCurrencyIdValid}
        errorMessage="Please choose currency"
        labelTitle={"Currency"}
      >
        <Select
          placeholder="Choose currency"
          value={currencyId}
          availableOptions={availableCurrenciesIds}
          onChange={setCurrencyId}
        />
      </FormControl>
      <FormControl
        isInvalid={!isExchangeRateValid}
        errorMessage="Exchange rate must be greater than 0"
        labelTitle={"Exchange Rate"}
      >
        <NumberInput
          placeholder="Enter exchange rate"
          value={exchangeRate}
          onChange={setExchangeRate}
        />
      </FormControl>
      <FormControl
        isInvalid={!isClientIdValid}
        errorMessage="Please choose client"
        labelTitle={"Client"}
      >
        <Select
          placeholder="Choose client"
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
