import { currencyClient } from "./currencyClient";

export const convertCurrencyToBaseCurrency = async (
  value: number,
  symbol: string
) => {
  try {
    const { data } = await currencyClient({
      url: "/currency/convert",
      params: { from: symbol, amount: value },
    });

    return parseFloat(
      data.rates[process.env.BASE_CURRENCY_SYMBOL].rate_for_amount
    );
  } catch (err) {
    console.error("CURRENCY CONVERTER ERROR", err);
  }
};

export const convertCurrenciesToBaseCurrencyValues = async (currencies) => {
  const convertedValues = await Promise.all(
    currencies.map(
      ({ value, symbol }, index) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(convertCurrencyToBaseCurrency(value, symbol));
          }, 10000 * index);
        })
    )
  );

  return convertedValues.reduce((sum, current) => sum + current, 0) as number;
};
