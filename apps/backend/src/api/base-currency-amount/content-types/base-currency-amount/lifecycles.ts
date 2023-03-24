export default {
  async afterUpdate(event) {
    const { result } = event;

    const { value: baseCurrencyValue, id } = await strapi.db
      .query("api::base-currency-value.base-currency-value")
      .findOne({
        select: ["id", "value"],
      });

    // TODO add value from other currencies
    const newCurrencyValue = result.value;

    await strapi.db
      .query("api::base-currency-value.base-currency-value")
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
