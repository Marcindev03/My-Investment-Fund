import { sleep } from "../helpers";
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
  const converted = [];

  for (let i = 0; i < currencies.length; i++) {
    const { value, symbol } = currencies[i];

    const convertedValue = await convertCurrencyToBaseCurrency(value, symbol);

    converted.push(convertedValue);

    await sleep(10000);
  }

  return converted.reduce((sum, current) => sum + current, 0) as number;
};
