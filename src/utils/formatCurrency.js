export const formatCurrency = (str) => {
  return new Intl.NumberFormat("ru-RU").format(str);
};
