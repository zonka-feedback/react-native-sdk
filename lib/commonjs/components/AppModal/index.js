"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));
var _AppWebView = _interopRequireDefault(require("../AppWebView"));
var _constant = _interopRequireDefault(require("../../utils/constant"));
var _SdkProvider = require("../../layout/SdkProvider");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const AppModal = ({
  modalVisible = false
}) => {
  const {
    url,
    setOpenModal
  } = (0, _react.useContext)(_SdkProvider.SDKContext);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
    animationType: "slide",
    transparent: true,
    visible: modalVisible
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.centeredView
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.modalView
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: styles.buttonClose,
    onPress: () => setOpenModal(false)
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.default, {
    width: 24,
    height: 24,
    viewBox: "0 0 455.111 455.111"
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Circle, {
    cx: 227.556,
    cy: 227.556,
    r: 227.556,
    fill: "#000000"
  }), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
    d: "M227.556,227.556m-227.556,0a227.556,227.556 0,1 1,455.112 0a227.556,227.556 0,1 1,-455.112 0",
    fill: "#000000"
  }), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
    d: "M455.111,227.556c0,125.156 -102.4,227.556 -227.556,227.556c-72.533,0 -136.533,-32.711 -177.778,-85.333c38.4,31.289 88.178,49.778 142.222,49.778c125.156,0 227.556,-102.4 227.556,-227.556c0,-54.044 -18.489,-103.822 -49.778,-142.222C422.4,91.022 455.111,155.022 455.111,227.556z",
    fill: "#000000"
  }), /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Path, {
    d: "M331.378,331.378c-8.533,8.533 -22.756,8.533 -31.289,0l-72.533,-72.533l-72.533,72.533c-8.533,8.533 -22.756,8.533 -31.289,0c-8.533,-8.533 -8.533,-22.756 0,-31.289l72.533,-72.533l-72.533,-72.533c-8.533,-8.533 -8.533,-22.756 0,-31.289c8.533,-8.533 22.756,-8.533 31.289,0l72.533,72.533l72.533,-72.533c8.533,-8.533 22.756,-8.533 31.289,0c8.533,8.533 8.533,22.756 0,31.289l-72.533,72.533l72.533,72.533C339.911,308.622 339.911,322.844 331.378,331.378z",
    fill: "#FFFFFF"
  }))), /*#__PURE__*/_react.default.createElement(_AppWebView.default, {
    uri: `${url}${_constant.default.EMBED_URL}`
  })))));
};
const styles = _reactNative.StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)" // Dark black background
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 8,
    position: "relative",
    width: 320,
    height: 250
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    zIndex: 1000,
    position: "absolute",
    top: -20,
    right: 15
  },
  crossImg: {
    width: 30,
    height: 30,
    resizeMode: "cover"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(AppModal);
//# sourceMappingURL=index.js.map