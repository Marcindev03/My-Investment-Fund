import { getCurrenciesValue, updateBaseCurrencyValue } from "../../../../lib";

export default {
  async afterUpdate(event) {
    const {
      result: { value: newBaseCurrencyAmount },
    } = event;

    const { value: currenciesValue } = await getCurrenciesValue();

    const newBaseCurrencyValue = currenciesValue + newBaseCurrencyAmount;

    await updateBaseCurrencyValue(newBaseCurrencyValue);
  },
};
