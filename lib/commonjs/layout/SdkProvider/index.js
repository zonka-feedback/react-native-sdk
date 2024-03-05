"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SDKContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Main = _interopRequireDefault(require("../Main"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// export const SDKContext = createContext<ZonkaontextType | null>(null);
const SDKContext = exports.SDKContext = /*#__PURE__*/(0, _react.createContext)(null);
const SdkProvider = ({
  children,
  value
}) => {
  const {
    token,
    region
  } = value;
  const [openModal, setOpenModal] = (0, _react.useState)(false);
  const [baseUrl, setBaseUrl] = (0, _react.useState)('');
  const [url, setUrl] = (0, _react.useState)('');
  const props = {
    openModal,
    setOpenModal,
    setUrl,
    url,
    token,
    region,
    baseUrl,
    setBaseUrl
  };
  return /*#__PURE__*/_react.default.createElement(SDKContext.Provider, {
    value: props
  }, /*#__PURE__*/_react.default.createElement(_Main.default, null, children));
};
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(SdkProvider);
//# sourceMappingURL=index.js.map