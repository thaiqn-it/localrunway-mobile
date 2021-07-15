import "intl";
import "intl/locale-data/jsonp/vi-VN";
import moment from "moment";

const vnCurrencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export const vndFormat = (price) => {
  return vnCurrencyFormatter.format(price);
};

export const bulkSearch = (values = []) => {
  let ar = [];
  for (let value of values) {
    if (!value) continue;
    value = value.toLowerCase();
    ar.push(value);
    value = value.replace(/\s/g, "");
    if (value.length !== ar[ar.length - 1].length) {
      ar.push(value);
    }
  }
  return ar.join(" ");
};

export const fromNow = (isoDateStr) => {
  return moment(isoDateStr).fromNow();
};
