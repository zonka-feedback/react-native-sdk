"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBaseUrlForContactTracking = exports.ApiManager = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _asyncStorage = require("../store/asyncStorage");
var _constant = _interopRequireDefault(require("../utils/constant"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Function to get the base URL based on the region
const getBaseUrlForServerHost = async () => {
  const zfRegion = await (0, _asyncStorage.retrieveData)(_constant.default.ZF_REGION);
  let baseUrl = '';
  if (zfRegion && zfRegion.toUpperCase() === 'EU') {
    baseUrl = _constant.default.HTTPS + 'e' + _constant.default.RETROFIT_URL;
  } else {
    // Handle other regions or use a default URL
    baseUrl = _constant.default.HTTPS + 'us1' + _constant.default.RETROFIT_URL;
  }
  return baseUrl;
};
const getBaseUrlForContactTracking = async () => {
  const zfRegion = await (0, _asyncStorage.retrieveData)(_constant.default.ZF_REGION);
  let baseUrl = '';
  if (zfRegion && zfRegion.toUpperCase() === 'EU') {
    baseUrl = 'https://e.apis.zonkafeedback.com/';
  } else {
    // Handle other regions or use a default URL
    baseUrl = 'https://us1.zonkasurvey.com/api/v1/';
  }
  return baseUrl;
};
exports.getBaseUrlForContactTracking = getBaseUrlForContactTracking;
const ApiManager = async (isServiceHost = true) => {
  const baseUrlForServerHost = await getBaseUrlForServerHost();
  const baseUrlContactTracking = await getBaseUrlForContactTracking();
  const apiServerHostClient = _axios.default.create({
    baseURL: isServiceHost ? baseUrlForServerHost : baseUrlContactTracking,
    timeout: 10000,
    // Adjust the timeout as needed
    headers: {
      'Accept': 'application/json',
      'x-rapidapi-host': 'famous-quotes4.p.rapidapi.com',
      'x-rapidapi-key': '<your-key-here>'
    }
  });

  // const setBaseUrl = async() => {
  //   apiServerHostClient?.defaults?.baseURL =await getBaseUrl();
  // };

  return apiServerHostClient;
};
exports.ApiManager = ApiManager;
//# sourceMappingURL=apiManager.js.map