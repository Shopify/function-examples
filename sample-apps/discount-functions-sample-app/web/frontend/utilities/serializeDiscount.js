export function serializeDiscount(discount) {
  return {
    title: discount.title,
    configuration: JSON.stringify(discount.configuration),
    startsAt: new Date(),
  };
}
