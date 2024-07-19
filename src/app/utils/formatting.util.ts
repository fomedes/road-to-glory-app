export function formatCurrency(num: number) {
  const currencyFormatter = new Intl.NumberFormat('es-sp', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return currencyFormatter.format(num);
}
