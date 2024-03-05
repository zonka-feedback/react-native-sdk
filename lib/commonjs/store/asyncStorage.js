"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeData = exports.saveFirstSeen = exports.saveCookieId = exports.retrieveData = exports.getCookieId = exports.clearSpecificKey = exports.clearAsyncData = void 0;
var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));
var _appUtils = _interopRequireDefault(require("../utils/appUtils"));
var _constant = _interopRequireDefault(require("../utils/constant"));
var _helperFunction = require("../utils/helperFunction");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const storeData = async (key, value) => {
  try {
    await _asyncStorage.default.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving region:", error);
  }
};
exports.storeData = storeData;
const clearAsyncData = async () => {
  try {
    await _asyncStorage.default.clear();
  } catch (error) {
    console.error(`Error clearing data from AsyncStorage: `, error);
  }
};
exports.clearAsyncData = clearAsyncData;
const retrieveData = async key => {
  try {
    const value = await _asyncStorage.default.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    console.error("Error retrieveData region:", error);
  }
};
exports.retrieveData = retrieveData;
const clearSpecificKey = async key => {
  try {
    await _asyncStorage.default.removeItem(key);
  } catch (error) {
    console.error(`Error clearing key "${key}" from AsyncStorage: `, error);
  }
};
exports.clearSpecificKey = clearSpecificKey;
const getFirstSeen = async () => {
  try {
    // Use AsyncStorage to retrieve the value asynchronously
    const firstSeen = (await _asyncStorage.default.getItem(_constant.default.USER_FIRST_SEEN)) || "";
    return firstSeen;
  } catch (error) {
    console.error("Error getting first seen:", error);
    return "";
  }
};
const saveFirstSeen = async () => {
  const dateFormat = "YYYY-MM-DD HH:mm:ss";
  try {
    // Check if USER_FIRST_SEEN is empty
    const storedFirstSeen = await getFirstSeen();
    if (!storedFirstSeen) {
      // If empty, save the first seen timestamp
      const firstSeenTimeStamp = Date.now();
      const firstSeen = (0, _helperFunction.formatTimestamp)(firstSeenTimeStamp, dateFormat);

      // Use AsyncStoUSER_FIRST_SEENrage to store the first seen timestamp asynchronously
      await storeData(_constant.default.USER_FIRST_SEEN, firstSeen);
    }
  } catch (error) {
    console.error("Error saving first seen:", error);
  }
};

// Function to get the stored cookie ID
exports.saveFirstSeen = saveFirstSeen;
const getCookieId = async () => {
  try {
    const storedCookieId = (await _asyncStorage.default.getItem(_constant.default.COOKIE_ID)) || "";
    return storedCookieId;
  } catch (error) {
    console.error("Error getting cookie ID:", error);
    return "";
  }
};

// Function to save a new cookie ID if it doesn't exist
exports.getCookieId = getCookieId;
const saveCookieId = async () => {
  try {
    const storedCookieId = await getCookieId();
    if (storedCookieId === "") {
      const randomString = _appUtils.default.getCookieId(24);
      const cookieId = "ad-" + randomString;

      // Use AsyncStorage to store the cookie ID asynchronously
      await _asyncStorage.default.setItem(_constant.default.COOKIE_ID, cookieId);
    }
  } catch (error) {
    console.error("Error saving cookie ID:", error);
  }
};
exports.saveCookieId = saveCookieId;
//# sourceMappingURL=asyncStorage.js.map