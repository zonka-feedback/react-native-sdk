"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useZFSurvey = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _SdkProvider = require("../../layout/SdkProvider");
var _service = require("../../services/service");
var _asyncStorage = require("../../store/asyncStorage");
var _appUtils = _interopRequireDefault(require("../../utils/appUtils"));
var _constant = _interopRequireDefault(require("../../utils/constant"));
var _zfsurveyHelperFunction = require("../../utils/zfsurveyHelperFunction");
var _zfSurveyUrlCreateHook = require("../zfSurveyUrlCreation/zfSurveyUrlCreateHook");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const useZFSurvey = () => {
  const {
    token,
    openModal,
    baseUrl,
    setOpenModal
  } = (0, _react.useContext)(_SdkProvider.SDKContext);
  const showAlert = () => _reactNative.Alert.alert('Warning', 'Call init method first and pass token and region', [{
    text: 'Cancel',
    style: 'cancel'
  }], {
    cancelable: true
  });
  const {
    getZonkaFeedbackSurveyUrlString
  } = (0, _zfSurveyUrlCreateHook.useZfSurveyUrlCreate)();
  const startSurvey = async (isDeviceDetail = false, sendCustomAttribute = {}) => {
    if (token) {
      if (await _appUtils.default.isNetworkConnected()) {
        getZonkaFeedbackSurveyUrlString(token, baseUrl, isDeviceDetail, sendCustomAttribute);
        if (!(await (0, _asyncStorage.retrieveData)(_constant.default.CONTACT_ID))) {
          if (!(await (0, _asyncStorage.retrieveData)(_constant.default.EXTERNAL_VISITOR_ID))) {
            (0, _zfsurveyHelperFunction.createContact)(token, startSurvey);
          } else {
            await (0, _service.hitSurveyActiveApi)(token, true, openModal, setOpenModal);
          }
        } else {
          await (0, _service.hitSurveyActiveApi)(token, true, openModal, setOpenModal);
        }
      } else {
        return;
      }
      if (await (0, _asyncStorage.retrieveData)(_constant.default.IS_WIDGET_ACTIVE)) {
        const segmentAllowed = await (0, _zfsurveyHelperFunction.checkSegmenting)();
        if (segmentAllowed) {
          setOpenModal(true);
        }
      }
    } else {
      showAlert();
    }
  };
  const sendCustomAttributes = hashMap => {
    return {
      sendDeviceDetails: isDeviceDetail => {
        return {
          startSurvey: () => startSurvey(isDeviceDetail, hashMap)
        };
      },
      startSurvey: () => startSurvey(false, hashMap)
    };
  };
  const sendDeviceDetails = async isDeviceDetail => {
    return {
      sendCustomAttributes: hashMap => {
        return {
          startSurvey: () => startSurvey(isDeviceDetail, hashMap)
        };
      },
      startSurvey: () => startSurvey(isDeviceDetail, {})
    };
  };
  const userInfo = hashMap => {
    (0, _zfsurveyHelperFunction.userInfoData)(hashMap, token, startSurvey);
    return {
      sendDeviceDetails: isDeviceDetail => {
        return {
          startSurvey: () => startSurvey(isDeviceDetail, hashMap)
        };
      },
      startSurvey: () => startSurvey(false, hashMap)
    };
  };
  const logout = () => {
    (0, _asyncStorage.clearAsyncData)();
    (0, _asyncStorage.saveCookieId)();
    (0, _asyncStorage.saveFirstSeen)();
  };
  return {
    startSurvey,
    sendCustomAttributes,
    sendDeviceDetails,
    userInfo,
    clear: logout
  };
};
exports.useZFSurvey = useZFSurvey;
//# sourceMappingURL=startSurveyHook.js.map