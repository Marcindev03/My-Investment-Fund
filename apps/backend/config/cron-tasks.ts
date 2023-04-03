import { Strapi } from "@strapi/strapi";
import { getCurrencies, updateCurrenciesValue } from "../src/lib";
import { convertCurrenciesToBaseCurrencyValues } from "../src/lib/api/currency";

export default {
  calculateCurrenciesValue: {
    task: async ({ strapi }: { strapi: Strapi }) => {
      const currencies = await getCurrencies();

      const newCurrenciesValue = await convertCurrenciesToBaseCurrencyValues(
        currencies
      );

      await updateCurrenciesValue(newCurrenciesValue);
    },
    options: {
      rule: "0 * * * *", // every hour
    },
  },
};
