"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userInfoData = exports.onWidgetSuccess = exports.onCreateCreatingSuccess = exports.getZfSurveyUrl = exports.generateSurveyUrl = exports.generateBaseUrl = exports.createContactForDynamicAttribute = exports.createContact = exports.checkSegmenting = void 0;
var _reactNative = require("react-native");
var _service = require("../services/service");
var _asyncStorage = require("../store/asyncStorage");
var _appUtils = _interopRequireDefault(require("./appUtils"));
var _constant = _interopRequireDefault(require("./constant"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let processEmbedSurvey = true;
const generateBaseUrl = (surveyToken, zfRegion) => {
  if (zfRegion && zfRegion.toUpperCase() === "EU") {
    return _constant.default.HTTPS + "e" + _constant.default.URL + surveyToken;
  }
  return _constant.default.HTTPS + "us1" + _constant.default.URL + surveyToken;
};
exports.generateBaseUrl = generateBaseUrl;
const generateSurveyUrl = (surveyToken, zfRegion, setBaseUrl) => {
  if (surveyToken === "") {
    console.log(_constant.default.TAG, "Token should not be empty");
    return;
  }
  const baseUrl = generateBaseUrl(surveyToken, zfRegion);
  setBaseUrl(baseUrl);
  return baseUrl;
};
exports.generateSurveyUrl = generateSurveyUrl;
const getZfSurveyUrl = baseUrl => {
  const customVariableString = "?";
  return baseUrl + customVariableString;
};
exports.getZfSurveyUrl = getZfSurveyUrl;
const userInfoData = (hashMap, token, startSurvey = null) => {
  if (hashMap !== null && Object.keys(hashMap).length > 0) {
    Object.entries(hashMap).forEach(([key, value]) => {
      if (key === _constant.default.EMAIL_ID && value) {
        (0, _asyncStorage.storeData)(_constant.default.EMAIL_ID, value.toString());
      }
      if (key === _constant.default.MOBILE_NO && value) {
        (0, _asyncStorage.storeData)(_constant.default.MOBILE_NO, value.toString());
      }
      if (key === _constant.default.UNIQUE_ID && value) {
        (0, _asyncStorage.storeData)(_constant.default.UNIQUE_ID, value.toString());
      }
      if (key === _constant.default.CONTACT_NAME && value) {
        (0, _asyncStorage.storeData)(_constant.default.CONTACT_NAME, value.toString());
      }
    });
  }
  createContactForDynamicAttribute(hashMap, token, startSurvey);
};
exports.userInfoData = userInfoData;
const createContactForDynamicAttribute = async (hashMap, token, startSurvey) => {
  const ipAddess = await _appUtils.default.getLocalIpAddress();
  let hashMapData = {
    [_constant.default.COOKIE_ID]: (0, _asyncStorage.getCookieId)(),
    [_constant.default.FIRST_SEEN]: (0, _asyncStorage.retrieveData)(_constant.default.FIRST_SEEN),
    [_constant.default.REQUEST_TYPE]: _reactNative.Platform.OS,
    [_constant.default.LAST_SEEN]: _appUtils.default.getCurrentTime(Date.now(), _constant.default.DATE_FORMAT),
    //pending
    [_constant.default.IP_ADDRESS]: ipAddess
  };
  if (await (0, _asyncStorage.retrieveData)(_constant.default.CONTACT_ID)) {
    hashMapData[_constant.default.CONTACT_ID] = await (0, _asyncStorage.retrieveData)(_constant.default.CONTACT_ID);
  } else {
    if (await (0, _asyncStorage.retrieveData)(_constant.default.EXTERNAL_VISITOR_ID)) {
      hashMapData[_constant.default.EXTERNAL_VISITOR_ID] = await (0, _asyncStorage.retrieveData)(_constant.default.EXTERNAL_VISITOR_ID);
    }
  }
  if (await (0, _asyncStorage.retrieveData)(_constant.default.EMAIL_ID)) {
    hashMapData[_constant.default.EMAIL_ID] = await (0, _asyncStorage.retrieveData)(_constant.default.EMAIL_ID);
  }
  if (await (0, _asyncStorage.retrieveData)(_constant.default.CONTACT_NAME)) {
    hashMapData[_constant.default.CONTACT_NAME] = await (0, _asyncStorage.retrieveData)(_constant.default.CONTACT_NAME);
  }
  if (await (0, _asyncStorage.retrieveData)(_constant.default.MOBILE_NO)) {
    hashMapData[_constant.default.MOBILE_NO] = await (0, _asyncStorage.retrieveData)(_constant.default.MOBILE_NO);
  }
  if (await (0, _asyncStorage.retrieveData)(_constant.default.UNIQUE_ID)) {
    hashMapData[_constant.default.UNIQUE_ID] = await (0, _asyncStorage.retrieveData)(_constant.default.UNIQUE_ID);
  }
  hashMapData = {
    ...hashMapData,
    ...{
      [_constant.default.IP_ADDRESS]: ipAddess,
      [_constant.default.UNIQUE_REF_CODE]: token,
      [_constant.default.JOB_TYPE]: "sdktd",
      [_constant.default.COMPANY_ID]: await (0, _asyncStorage.retrieveData)(_constant.default.COMPANY_ID),
      [_constant.default.CONTACT_DEVICE_OS]: _reactNative.Platform.OS,
      [_constant.default.CONTACT_DEVICE_NAME]: _reactNative.Platform.OS,
      [_constant.default.CONTACT_DEVICE_MODEL]: _reactNative.Platform.OS,
      [_constant.default.CONTACT_DEVICE_BRAND]: _reactNative.Platform.OS,
      [_constant.default.CONTACT_DEVICE_OS_VERSION]: _reactNative.Platform.Version,
      [_constant.default.CONTACT_DEVICE]: _appUtils.default.isTablet() ? "Tablet" : "Mobile"
    }
  };
  const mergedHashData = {
    ...hashMap,
    ...hashMapData
  };
  await (0, _service.hitCreateContactApiDynamic)(mergedHashData, startSurvey);
};
exports.createContactForDynamicAttribute = createContactForDynamicAttribute;
const onCreateCreatingSuccess = async (isContactCreated, surveyStart) => {
  if (isContactCreated) {
    await surveyStart();
  }
};
exports.onCreateCreatingSuccess = onCreateCreatingSuccess;
const onWidgetSuccess = async (widget, isSurveyInitialize, isZfSurveyModalVisible, setOpenModal) => {
  var _widget$data, _widget$data2, _widget$data3;
  (0, _asyncStorage.storeData)(_constant.default.IS_WIDGET_ACTIVE, (widget === null || widget === void 0 || (_widget$data = widget.data) === null || _widget$data === void 0 || (_widget$data = _widget$data.distributionInfo) === null || _widget$data === void 0 ? void 0 : _widget$data.isWidgetActive) || false);
  (0, _asyncStorage.storeData)(_constant.default.COMPANY_ID, (widget === null || widget === void 0 || (_widget$data2 = widget.data) === null || _widget$data2 === void 0 || (_widget$data2 = _widget$data2.distributionInfo) === null || _widget$data2 === void 0 ? void 0 : _widget$data2.companyId) || "");
  if (widget !== null && widget !== void 0 && (_widget$data3 = widget.data) !== null && _widget$data3 !== void 0 && (_widget$data3 = _widget$data3.distributionInfo) !== null && _widget$data3 !== void 0 && _widget$data3.isWidgetActive) {
    if (!isZfSurveyModalVisible && isSurveyInitialize) {
      const segmentAllowed = await checkSegmenting();
      if ((await (0, _asyncStorage.retrieveData)(_constant.default.EMAIL_ID)) != null) {
        if (segmentAllowed) {
          setOpenModal(true);
        }
        //dispatch(setZfSureveyDialog(true));
        // return
      } else {
        if (segmentAllowed) {
          setOpenModal(true);
        }
      }
    }
  } else {
    setOpenModal(false);
  }
};
exports.onWidgetSuccess = onWidgetSuccess;
const checkSegmenting = async () => {
  //let processEmbedSurvey = false;
  let includedList = [];
  let excludedList = [];
  let contactResponseList = [];
  let evdResponseList = [];
  const includeType = await (0, _asyncStorage.retrieveData)(_constant.default.INCLUDE_TYPE);
  const excludeType = await (0, _asyncStorage.retrieveData)(_constant.default.EXCLUDE_TYPE);
  const includedListSet = await (0, _asyncStorage.retrieveData)(_constant.default.INCLUDED_LIST);
  if (includedListSet != null) {
    includedList = Array.from(includedListSet || []);
    // Clear the included list
    (0, _asyncStorage.clearSpecificKey)(_constant.default.INCLUDED_LIST);
  }
  const excludedListSet = await (0, _asyncStorage.retrieveData)(_constant.default.EXCLUDED_LIST);
  if (excludedListSet != null) {
    excludedList = Array.from(excludedListSet || []);
    // Clear the excluded list
    (0, _asyncStorage.clearSpecificKey)(_constant.default.EXCLUDED_LIST);
  }
  const contactListSet = await (0, _asyncStorage.retrieveData)(_constant.default.CONTACT_LIST);
  if (contactListSet != null) {
    contactResponseList = Array.from(contactListSet || []);
  }
  const evdListSet = await (0, _asyncStorage.retrieveData)(_constant.default.EVD_LIST);
  if (evdListSet != null) {
    evdResponseList = Array.from(evdListSet || []);
  }
  if (includeType === "all") {
    processEmbedSurvey = true;
  } else if (includeType === "any") {
    if (includedList && includedList.length > 0) {
      processEmbedSurvey = false;
      if (contactResponseList && contactResponseList.length > 0) {
        for (let i = 0; i < contactResponseList.length; i++) {
          const segmentInContact = contactResponseList[i];
          if (includedList.includes(segmentInContact)) {
            processEmbedSurvey = true;
            break;
          }
        }
      } else if (evdResponseList && evdResponseList.length > 0) {
        for (let i = 0; i < evdResponseList.length; i++) {
          const segmentInContact = evdResponseList[i];
          if (includedList.includes(segmentInContact)) {
            processEmbedSurvey = true;
            break;
          }
        }
      }
    }
  } else if (excludeType === "all") {
    processEmbedSurvey = false;
  } else if (excludeType === "any") {
    if (excludedList && excludedList.length > 0) {
      if (contactResponseList && contactResponseList.length > 0) {
        for (let i = 0; i < contactResponseList.length; i++) {
          const segmentInContact = contactResponseList[i];
          if (excludedList.includes(segmentInContact)) {
            processEmbedSurvey = false;
            break;
          }
        }
      } else if (evdResponseList && evdResponseList.length > 0) {
        for (let i = 0; i < evdResponseList.length; i++) {
          const segmentInContact = evdResponseList[i];
          if (excludedList.includes(segmentInContact)) {
            processEmbedSurvey = false;
            break;
          }
        }
      }
    }
  }
  return processEmbedSurvey;
};
exports.checkSegmenting = checkSegmenting;
const createContact = async (token, startSurvey) => {
  const ipAddess = await _appUtils.default.getLocalIpAddress();
  let hashMapData = {
    [_constant.default.COOKIE_ID]: (0, _asyncStorage.getCookieId)(),
    [_constant.default.FIRST_SEEN]: await (0, _asyncStorage.retrieveData)(_constant.default.USER_FIRST_SEEN),
    [_constant.default.REQUEST_TYPE]: _reactNative.Platform.OS,
    [_constant.default.LAST_SEEN]: _appUtils.default.getCurrentTime(Date.now(), _constant.default.DATE_FORMAT),
    [_constant.default.IP_ADDRESS]: ipAddess
  };
  if (await (0, _asyncStorage.retrieveData)(_constant.default.CONTACT_ID)) {
    hashMapData[_constant.default.CONTACT_ID] = await (0, _asyncStorage.retrieveData)(_constant.default.CONTACT_ID);
  } else {
    if (await (0, _asyncStorage.retrieveData)(_constant.default.EXTERNAL_VISITOR_ID)) {
      hashMapData[_constant.default.EXTERNAL_VISITOR_ID] = await (0, _asyncStorage.retrieveData)(_constant.default.EXTERNAL_VISITOR_ID);
    }
  }
  if (await (0, _asyncStorage.retrieveData)(_constant.default.EMAIL_ID)) {
    hashMapData[_constant.default.EMAIL_ID] = await (0, _asyncStorage.retrieveData)(_constant.default.EMAIL_ID);
  }
  if (await (0, _asyncStorage.retrieveData)(_constant.default.CONTACT_NAME)) {
    hashMapData[_constant.default.CONTACT_NAME] = await (0, _asyncStorage.retrieveData)(_constant.default.CONTACT_NAME);
  }
  if (await (0, _asyncStorage.retrieveData)(_constant.default.MOBILE_NO)) {
    hashMapData[_constant.default.MOBILE_NO] = await (0, _asyncStorage.retrieveData)(_constant.default.MOBILE_NO);
  }
  if (await (0, _asyncStorage.retrieveData)(_constant.default.UNIQUE_ID)) {
    hashMapData[_constant.default.UNIQUE_ID] = await (0, _asyncStorage.retrieveData)(_constant.default.UNIQUE_ID);
  }
  hashMapData = {
    ...hashMapData,
    ...{
      [_constant.default.IP_ADDRESS]: ipAddess,
      [_constant.default.UNIQUE_REF_CODE]: token,
      [_constant.default.JOB_TYPE]: "sdktd",
      [_constant.default.COMPANY_ID]: await (0, _asyncStorage.retrieveData)(_constant.default.COMPANY_ID),
      [_constant.default.CONTACT_DEVICE_OS]: _reactNative.Platform.OS,
      [_constant.default.CONTACT_DEVICE_NAME]: _reactNative.Platform.OS,
      [_constant.default.CONTACT_DEVICE_MODEL]: _reactNative.Platform.OS,
      [_constant.default.CONTACT_DEVICE_BRAND]: _reactNative.Platform.OS,
      [_constant.default.CONTACT_DEVICE_OS_VERSION]: _reactNative.Platform.Version,
      [_constant.default.CONTACT_DEVICE]: _appUtils.default.isTablet() ? "Tablet" : "Mobile"
    }
  };
  await (0, _service.hitCreateContactAPI)(hashMapData, startSurvey);
};
exports.createContact = createContact;
//# sourceMappingURL=zfsurveyHelperFunction.js.map