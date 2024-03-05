"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _AppModal = _interopRequireDefault(require("../../components/AppModal"));
var _reactNative = require("react-native");
var _hook = require("./hook");
var _SdkProvider = require("../SdkProvider");
var _hooks = require("../../hooks");
var _zfsurveyHelperFunction = require("../../utils/zfsurveyHelperFunction");
var _appUtils = _interopRequireDefault(require("../../utils/appUtils"));
var _sessionHelperFunctions = require("../../utils/sessionHelperFunctions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Main = ({
  children
}) => {
  const {
    init
  } = (0, _hook.useInitializeZFSdk)();
  const {
    startSurvey
  } = (0, _hooks.useZFSurvey)();
  const isPaused = (0, _react.useRef)(false);
  const syncingAllowedHandler = (0, _react.useRef)(null);
  const check = (0, _react.useRef)(null);
  const isForeground = (0, _react.useRef)(false);
  const isApplicationExit = (0, _react.useRef)(false);
  const {
    token,
    region,
    openModal,
    url
  } = (0, _react.useContext)(_SdkProvider.SDKContext);
  (0, _react.useEffect)(() => {
    init(token, region);
  }, []);
  const handleAppStateChange = newState => {
    if (token && url) {
      if (newState === 'active') {
        onActivityResumed();
      } else if (newState === 'background') {
        onActivityPaused();
      }
    }
  };

  //When activity resumed
  const onActivityResumed = () => {
    isForeground.current = false;
    const wasBackground = !isForeground.current;
    isForeground.current = true;
    if (check.current) {
      clearTimeout(check.current);
    }
    if (wasBackground) {
      if (token) {
        (0, _zfsurveyHelperFunction.createContact)(token, startSurvey);
      }
      if (syncingAllowedHandler.current) {
        clearTimeout(syncingAllowedHandler.current);
        syncingAllowedHandler.current = null;
      }
      // Replace with your React Native logic for Sessions
      const sessions = {
        startTime: new Date().getTime(),
        id: `ad-${new Date().getTime()}${_appUtils.default.getCookieId(14)}`,
        endTime: 0
      };
      (0, _sessionHelperFunctions.sessionInsert)(sessions, isApplicationExit.current, token);
      isApplicationExit.current = false;
    }
  };
  const onActivityPaused = () => {
    isPaused.current = true;
    if (check.current) {
      clearTimeout(check.current);
    }
    setTimeout(() => {
      // if (isForeground.current && isPaused.current) {
      console.log('call after timeout');
      if (isPaused.current) {
        isForeground.current = false;
        isApplicationExit.current = false;
        if (token) {
          (0, _zfsurveyHelperFunction.createContact)(token, startSurvey);
          // createContact implementation
        }
      }
    }, 10000);
  };
  const onActivityDestroyed = () => {
    isApplicationExit.current = true;
    if (syncingAllowedHandler.current) {
      clearTimeout(syncingAllowedHandler.current);
      syncingAllowedHandler.current = null;
    }
  };
  (0, _react.useEffect)(() => {
    const subscription = _reactNative.AppState.addEventListener('change', nextAppState => {
      handleAppStateChange(nextAppState);
    });
    if (check.current) {
      clearTimeout(check.current);
    }
    if (syncingAllowedHandler.current) {
      clearTimeout(syncingAllowedHandler.current);
    }
    return () => {
      isApplicationExit.current = true;
      subscription.remove();
      onActivityDestroyed();
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, openModal && /*#__PURE__*/_react.default.createElement(_AppModal.default, {
    modalVisible: openModal
  })));
};
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(Main);
//# sourceMappingURL=index.js.map