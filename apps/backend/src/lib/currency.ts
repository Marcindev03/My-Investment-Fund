export const getCurrencies = async () =>
  await strapi.db.query("api::currency.currency").findMany({});

export const addValueToCurrency = async (currencyId: number, value: number) => {
  const { value: currentValue } = await strapi.db
    .query("api::currency.currency")
    .findOne({
      where: {
        id: currencyId,
      },
      select: ["value"],
    });

  await strapi.db.query("api::currency.currency").update({
    where: {
      id: currencyId,
    },
    data: {
      value: currentValue + value,
    },
  });
};

export const updateBaseCurrencyValue = async (value: number) =>
  await strapi.db.query("api::base-currency-value.base-currency-value").update({
    where: {
      id: 1,
    },
    data: {
      value,
    },
  });

export const getBaseCurrencyAmount = async (): Promise<{ value: number }> =>
  await strapi.db
    .query("api::base-currency-amount.base-currency-amount")
    .findOne({
      select: ["value"],
    });

export const getCurrenciesValue = async (): Promise<{ value: number }> =>
  await strapi.db.query("api::currencies-value.currencies-value").findOne({
    select: ["value"],
  });

export const addValueToCurrenciesValue = async (value: number) => {
  const { value: currentValue } = await strapi.db
    .query("api::currencies-value.currencies-value")
    .findOne({
      select: ["value"],
    });

  await strapi.db.query("api::currencies-value.currencies-value").update({
    where: {
      id: 1,
    },
    data: {
      value: currentValue + value,
    },
  });
};

export const updateCurrenciesValue = async (value: number) =>
  await strapi.db.query("api::currencies-value.currencies-value").update({
    where: {
      id: 1,
    },
    data: {
      value,
    },
  });
