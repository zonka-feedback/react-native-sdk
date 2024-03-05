"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ZonkaFeedback: true
};
Object.defineProperty(exports, "ZonkaFeedback", {
  enumerable: true,
  get: function () {
    return _SdkProvider.default;
  }
});
var _SdkProvider = _interopRequireDefault(require("./layout/SdkProvider"));
var _index = require("./hooks/index");
Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map