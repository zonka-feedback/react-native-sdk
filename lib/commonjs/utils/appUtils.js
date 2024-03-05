"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _netinfo = _interopRequireDefault(require("@react-native-community/netinfo"));
var _reactNative = require("react-native");
var _reactNativeDeviceInfo = _interopRequireDefault(require("react-native-device-info"));
var _constant = _interopRequireDefault(require("./constant"));
var _helperFunction = require("./helperFunction");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AppUtils = {
  getAppVersionCode: async function () {
    try {
      const versionCode = _reactNativeDeviceInfo.default.getVersion();
      return versionCode;
    } catch (error) {
      console.error('Error getting app version code:', error);
      return null;
    }
  },
  getDeviceId: async function () {
    try {
      const deviceId = _reactNativeDeviceInfo.default.getUniqueId();
      return deviceId || ' ';
    } catch (error) {
      console.error('Error getting Android device ID:', error);
      return ' ';
    }
  },
  getDeviceSerial: async function () {
    try {
      const deviceSerial = _reactNativeDeviceInfo.default.getSerialNumber();
      return deviceSerial || 'N/A';
    } catch (error) {
      console.error('Error getting device serial number:', error);
      return 'N/A';
    }
  },
  getDeviceIMEI: async function () {
    // Implementation may vary based on how you retrieve device IMEI in your React Native project
    return '1234vb';
  },
  getDeviceResolution: function () {
    const {
      width,
      height
    } = _reactNative.Dimensions.get('window');
    return `${width}x${height}`;
  },
  getLocalIpAddress: async function () {
    try {
      const connectionInfo = await _reactNativeDeviceInfo.default.getIpAddress();
      return connectionInfo || 'N/A';
    } catch (error) {
      console.error('Error getting local IP address:', error);
      return 'N/A';
    }
  },
  get_network: async function () {
    try {
      const netInfo = await _netinfo.default.fetch();
      return netInfo.type;
    } catch (error) {
      console.error('Error getting local IP address:', error);
      return 'N/A';
    }
  },
  isTablet: function () {
    const {
      height,
      width
    } = _reactNative.Dimensions.get('window');
    const aspectRatio = height / width;
    return aspectRatio < 1.6; // Assuming a tablet if the aspect ratio is less than 1.6
  },
  isNetworkConnected: async function () {
    const netInfo = await _netinfo.default.fetch();
    return netInfo.isConnected;
  },
  getTimeZone: async function () {
    const {
      ZonkaReactSdk
    } = _reactNative.NativeModules;
    const timezone = await ZonkaReactSdk.getTimeZone();
    return timezone;
  },
  getHiddenVariables: async function () {
    const hashMap = {
      [_constant.default.DEVICE_RESOLUTION]: await this.getDeviceResolution(),
      [_constant.default.DEVICE_SERIAL]: await this.getDeviceSerial(),
      [_constant.default.GET_NETWORK]: await this.get_network(),
      [_constant.default.DEVICE_NAME]: await _reactNativeDeviceInfo.default.getDeviceName(),
      [_constant.default.DEVICE_MODEL]: await _reactNativeDeviceInfo.default.getModel(),
      [_constant.default.DEVICE_BRAND]: await _reactNativeDeviceInfo.default.getBrand(),
      [_constant.default.TIME_ZONE]: this.getTimeZone(),
      [_constant.default.DEVICE_TYPE]: (await this.isTablet()) ? 'Tablet' : 'Mobile',
      [_constant.default.DEVICE_OS]: (0, _helperFunction.capitalizeFirstLetter)(_reactNative.Platform.OS),
      [_constant.default.APP_VERSION_NAME]: await this.getAppVersionCode(),
      [_constant.default.DEVICE_OS_VERSION]: await _reactNativeDeviceInfo.default.getBaseOs(),
      [_constant.default.SCREEN_NAME]: this.getScreenName()
    };
    return hashMap;
  },
  // Add the rest of the functions similarly

  calculateDifferenceTime: async function (createdDateInMs) {
    // Implementation may vary based on your requirements
    const currentDateInMS = Date.now();
    const difference = currentDateInMS - createdDateInMs;
    const secondsInMilli = 1000;
    if (difference === 0) {
      return true;
    }
    const elapsedSeconds = Math.floor(difference / secondsInMilli);
    return elapsedSeconds <= 20;
  },
  getCurrentTime: function (timestamp, format) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Format the date and time
    let formattedDateTime;
    switch (format) {
      case 'yyyy-MM-dd HH:mm:ss':
        formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        break;
      case 'dd/MM/yyyy HH:mm:ss':
        formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        break;
      // Add more cases for other formats as needed
      default:
        formattedDateTime = 'Invalid format';
        break;
    }
    return formattedDateTime;
  },
  getCookieId: function (length = 12) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  },
  getScreenName: function () {
    // Implementation may vary based on how you get the current screen name in your React Native project
    return 'Dashboard';
  }
};
var _default = exports.default = AppUtils;
//# sourceMappingURL=appUtils.js.map