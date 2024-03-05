"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useZfSurveyUrlCreate = void 0;
var _react = require("react");
var _SdkProvider = require("../../layout/SdkProvider");
var _asyncStorage = require("../../store/asyncStorage");
var _appUtils = _interopRequireDefault(require("../../utils/appUtils"));
var _constant = _interopRequireDefault(require("../../utils/constant"));
var _zfsurveyHelperFunction = require("../../utils/zfsurveyHelperFunction");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const useZfSurveyUrlCreate = () => {
  const {
    setUrl
  } = (0, _react.useContext)(_SdkProvider.SDKContext);
  const [, setCustomVariableString] = (0, _react.useState)("");
  const getZonkaFeedbackSurveyUrlString = async (token, baseUrl, deviceDetails = false, getCustomAttributes = {}) => {
    if (baseUrl) {
      let url = (0, _zfsurveyHelperFunction.getZfSurveyUrl)(baseUrl);
      const cookieId = await (0, _asyncStorage.getCookieId)();
      const externalVisitorId = await (0, _asyncStorage.retrieveData)(_constant.default.EXTERNAL_VISITOR_ID);
      const contactId = await (0, _asyncStorage.retrieveData)(_constant.default.CONTACT_ID);
      if (getCustomAttributes != null && Object.keys(getCustomAttributes).length > 0) {
        const variableString = addCustomParam(getCustomAttributes, token);
        setCustomVariableString(variableString);
        url = url + variableString;
      }
      if (cookieId !== "") {
        setCustomVariableString("");
        url = url + "cookieId" + "=" + cookieId + "&";
      }
      if (externalVisitorId) {
        setCustomVariableString("");
        url = url + "externalVisitorId" + "=" + externalVisitorId + "&";
      }
      if (contactId) {
        setCustomVariableString("");
        url = url + "contactId" + "=" + contactId + "&";
      }
      if (deviceDetails) {
        setCustomVariableString("");
        const variableString = addCustomParam(await _appUtils.default.getHiddenVariables(), token);
        setCustomVariableString(variableString);
        url = url + variableString;
      }
      setUrl(url);
    }
  };
  const addCustomParam = (hashMap, token) => {
    let variableString = "";
    for (const [key, value] of Object.entries(hashMap)) {
      variableString += `${key}=${value}&`;
    }
    (0, _zfsurveyHelperFunction.userInfoData)(hashMap, token);
    return variableString;
  };
  return {
    getZonkaFeedbackSurveyUrlString
  };
};
exports.useZfSurveyUrlCreate = useZfSurveyUrlCreate;
//# sourceMappingURL=zfSurveyUrlCreateHook.js.map