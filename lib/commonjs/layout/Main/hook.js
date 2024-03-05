"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useInitializeZFSdk = void 0;
var _react = require("react");
var _zfSurveyUrlCreateHook = require("../../hooks/zfSurveyUrlCreation/zfSurveyUrlCreateHook");
var _service = require("../../services/service");
var _asyncStorage = require("../../store/asyncStorage");
var _appUtils = _interopRequireDefault(require("../../utils/appUtils"));
var _constant = _interopRequireDefault(require("../../utils/constant"));
var _zfsurveyHelperFunction = require("../../utils/zfsurveyHelperFunction");
var _SdkProvider = require("../SdkProvider");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const useInitializeZFSdk = () => {
  const {
    setBaseUrl,
    openModal,
    setOpenModal
  } = (0, _react.useContext)(_SdkProvider.SDKContext);
  const {
    getZonkaFeedbackSurveyUrlString
  } = (0, _zfSurveyUrlCreateHook.useZfSurveyUrlCreate)();
  const init = async (token, region) => {
    if (!!token && !!region) {
      const baseUrl = (0, _zfsurveyHelperFunction.generateSurveyUrl)(token, region, setBaseUrl);
      (0, _asyncStorage.storeData)(_constant.default.ZF_REGION, region);
      (0, _asyncStorage.saveFirstSeen)();
      (0, _asyncStorage.saveCookieId)();
      getZonkaFeedbackSurveyUrlString(token, baseUrl);
      if (await _appUtils.default.isNetworkConnected()) {
        await (0, _service.hitSurveyActiveApi)(token, false, openModal, setOpenModal);
      }
    }
  };
  return {
    init
  };
};
exports.useInitializeZFSdk = useInitializeZFSdk;
//# sourceMappingURL=hook.js.map