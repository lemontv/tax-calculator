export const formatCurrency = (value: number | string, currency = "USD") => {
  const num = typeof value === "string" ? parseFloat(value) : value;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(num);
};

export const formatPercentage = (value: number, minimumFractionDigits = 2) => {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits,
  }).format(value);
};
