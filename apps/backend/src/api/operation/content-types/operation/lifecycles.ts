export default {
  async afterCreate(event) {
    const { result } = event;

    const { value: baseCurrencyValue, id } = await strapi.db
      .query("api::base-currency-amount.base-currency-amount")
      .findOne({
        select: ["id", "value"],
      });

    let newCurrencyValue = baseCurrencyValue;

    if (result.type === "deposit") {
      newCurrencyValue += result.amount;
    }

    if (result.type === "withdrawal") {
      newCurrencyValue -= result.amount;
    }

    await strapi.db
      .query("api::base-currency-amount.base-currency-amount")
      .update({
        where: {
          id,
        },
        data: {
          value: newCurrencyValue,
        },
      });
  },
};
