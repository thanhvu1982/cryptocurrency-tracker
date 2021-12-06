export const formatPrice = (price: number): string => {
  const stringValue = price.toString();
  const [decimal, fraction] = stringValue.split('.');
  const formattedDecimal = new Intl.NumberFormat('de-DE').format(
    parseInt(decimal, 10),
  );

  if (price < 0.0001) {
    return `$${formattedDecimal},${fraction.slice(0, 6)}`;
  } else if (price < 0.001) {
    return `$${formattedDecimal},${fraction.slice(0, 5)}`;
  } else if (price < 0.01) {
    return `$${formattedDecimal},${fraction.slice(0, 4)}`;
  } else if (price < 100) {
    return `$${formattedDecimal},${fraction.slice(0, 3)}`;
  } else {
    return `$${formattedDecimal},${fraction.slice(0, 2)}`;
  }
};
