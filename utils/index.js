import 'intl';
import 'intl/locale-data/jsonp/vi-VN'; 
const vnCurrencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export const vndFormat = (price) => {
  return vnCurrencyFormatter.format(price);
};
