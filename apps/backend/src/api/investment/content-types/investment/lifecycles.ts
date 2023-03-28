import { addValueToCurrenciesValue, addValueToCurrency } from "../../../../lib";

export default {
  async afterCreate(event) {
    const {
      result: { amount, exchangeRate },
      params: {
        data: { currency },
      },
    } = event;

    await addValueToCurrency(currency, amount);

    await addValueToCurrenciesValue(amount * exchangeRate);
  },
};
