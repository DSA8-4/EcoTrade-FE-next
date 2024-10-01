export function formatPrice(amount, locale = 'ko-KR', currency = 'KRW') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
