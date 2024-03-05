import AsyncStorage from "@react-native-async-storage/async-storage";
import AppUtils from "../utils/appUtils";
import Constant from "../utils/constant";
import { formatTimestamp } from "../utils/helperFunction";
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving region:", error);
  }
};
const clearAsyncData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error(`Error clearing data from AsyncStorage: `, error);
  }
};
const retrieveData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    console.error("Error retrieveData region:", error);
  }
};
const clearSpecificKey = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error clearing key "${key}" from AsyncStorage: `, error);
  }
};
const getFirstSeen = async () => {
  try {
    // Use AsyncStorage to retrieve the value asynchronously
    const firstSeen = (await AsyncStorage.getItem(Constant.USER_FIRST_SEEN)) || "";
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
      const firstSeen = formatTimestamp(firstSeenTimeStamp, dateFormat);

      // Use AsyncStoUSER_FIRST_SEENrage to store the first seen timestamp asynchronously
      await storeData(Constant.USER_FIRST_SEEN, firstSeen);
    }
  } catch (error) {
    console.error("Error saving first seen:", error);
  }
};

// Function to get the stored cookie ID
const getCookieId = async () => {
  try {
    const storedCookieId = (await AsyncStorage.getItem(Constant.COOKIE_ID)) || "";
    return storedCookieId;
  } catch (error) {
    console.error("Error getting cookie ID:", error);
    return "";
  }
};

// Function to save a new cookie ID if it doesn't exist
const saveCookieId = async () => {
  try {
    const storedCookieId = await getCookieId();
    if (storedCookieId === "") {
      const randomString = AppUtils.getCookieId(24);
      const cookieId = "ad-" + randomString;

      // Use AsyncStorage to store the cookie ID asynchronously
      await AsyncStorage.setItem(Constant.COOKIE_ID, cookieId);
    }
  } catch (error) {
    console.error("Error saving cookie ID:", error);
  }
};
export { clearAsyncData, clearSpecificKey, getCookieId, retrieveData, saveCookieId, saveFirstSeen, storeData };
//# sourceMappingURL=asyncStorage.js.map