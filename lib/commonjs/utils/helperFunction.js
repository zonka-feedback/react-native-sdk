"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTimestamp = exports.capitalizeFirstLetter = void 0;
const formatTimestamp = (timestamp, format) => {
  const date = new Date(timestamp);
  return format.replace('YYYY', date.getFullYear()).replace('MM', `0${date.getMonth() + 1}`.slice(-2)).replace('DD', `0${date.getDate()}`.slice(-2)).replace('HH', `0${date.getHours()}`.slice(-2)).replace('mm', `0${date.getMinutes()}`.slice(-2)).replace('ss', `0${date.getSeconds()}`.slice(-2));
};
exports.formatTimestamp = formatTimestamp;
const capitalizeFirstLetter = value => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
exports.capitalizeFirstLetter = capitalizeFirstLetter;
//# sourceMappingURL=helperFunction.js.map