export const formatPrice = (price: number): string => {
  return `$${new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'USD',
  })
    .format(price)
    .slice(0, -2)}`;
};
