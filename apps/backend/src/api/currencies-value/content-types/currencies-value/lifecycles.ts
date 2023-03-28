import {
  getBaseCurrencyAmount,
  updateBaseCurrencyValue,
} from "../../../../lib";

export default {
  async afterUpdate(event) {
    const {
      result: { value: newCurrenciesValue },
    } = event;

    const { value: baseCurrencyAmount } = await getBaseCurrencyAmount();

    const newBaseCurrencyValue = baseCurrencyAmount + newCurrenciesValue;

    await updateBaseCurrencyValue(newBaseCurrencyValue);
  },
};
