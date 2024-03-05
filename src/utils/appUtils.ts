import NetInfo from '@react-native-community/netinfo';
import { Dimensions, NativeModules, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { retrieveData } from '../store/asyncStorage';
import Constant from './constant';
import { capitalizeFirstLetter } from './helperFunction';

const AppUtils = {
  getAppVersionCode: async function () {
    try {
      const versionCode = DeviceInfo.getVersion();
      return versionCode;
    } catch (error) {
      console.error('Error getting app version code:', error);
      return null;
    }
  },

  getDeviceId: async function () {
    try {
      const deviceId = DeviceInfo.getUniqueId();
      return deviceId || ' ';
    } catch (error) {
      console.error('Error getting Android device ID:', error);
      return ' ';
    }
  },

  getDeviceSerial: async function () {
    try {
      const deviceSerial = DeviceInfo.getSerialNumber();
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
    const { width, height } = Dimensions.get('window');
    return `${width.toFixed(0)}x${height.toFixed(0)}`;
  },

  getLocalIpAddress: async function () {
    try {
      const connectionInfo: any = await DeviceInfo.getIpAddress();
      return connectionInfo || 'N/A';
    } catch (error) {
      console.error('Error getting local IP address:', error);
      return 'N/A';
    }
  },

  get_network: async function () {
    try {
      const netInfo = await NetInfo.fetch();
      return netInfo.type;
    } catch (error) {
      console.error('Error getting local IP address:', error);
      return 'N/A';
    }
  },

  isTablet: function () {
    const { height, width } = Dimensions.get('window');
    const aspectRatio = height / width;
    return aspectRatio < 1.6; // Assuming a tablet if the aspect ratio is less than 1.6
  },

  isNetworkConnected: async function () {
    const netInfo = await NetInfo.fetch();
    return netInfo.isConnected;
  },
  getTimeZone: async function () {
    // const { ZonkaReactSdk } = NativeModules;
    // const timezone = await ZonkaReactSdk.getTimeZone();
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  },

  getHiddenVariables: async function () {
    const hashMap = {
      [Constant.DEVICE_RESOLUTION]: await this.getDeviceResolution(),
      [Constant.DEVICE_SERIAL]: await this.getDeviceSerial(),
      [Constant.GET_NETWORK]: await this.get_network(),
      [Constant.DEVICE_NAME]: await DeviceInfo.getDeviceName(),
      [Constant.DEVICE_MODEL]: await DeviceInfo.getModel(),
      [Constant.DEVICE_BRAND]: await DeviceInfo.getBrand(),
      [Constant.TIME_ZONE]: await this.getTimeZone(),
      [Constant.DEVICE_TYPE]: (await this.isTablet()) ? 'Tablet' : 'Mobile',
      [Constant.DEVICE_OS]: capitalizeFirstLetter(Platform.OS),
      [Constant.APP_VERSION_NAME]: await this.getAppVersionCode(),
      [Constant.DEVICE_OS_VERSION]: await DeviceInfo.getSystemVersion(),
      [Constant.SCREEN_NAME]: await this.getScreenName(),
    };

    return hashMap;
  },

  // Add the rest of the functions similarly

  calculateDifferenceTime: async function (createdDateInMs: number) {
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

  getCurrentTime: function (timestamp: any, format: string) {
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
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  },

  getScreenName: async function () {
    const { ZonkaReactSdk } = NativeModules;
    const screenName = await ZonkaReactSdk.getScreenName();
    const getScreenName = await retrieveData(Constant.SCREEN_NAME);
    // Implementation may vary based on how you get the current screen name in your React Native project
    return getScreenName ? getScreenName : screenName ? screenName : 'Home';
  },
};

export default AppUtils;
