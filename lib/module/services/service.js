import axios from 'axios';
import { storeData } from '../store/asyncStorage';
import Constant from '../utils/constant';
import { onCreateCreatingSuccess, onWidgetSuccess } from './../utils/zfsurveyHelperFunction';
import { ApiManager } from './apiManager';
export const hitSurveyActiveApi = async (token, isSurveyInitialize, isModalVisible, setOpenModal) => {
  const apiServerHostClient = await ApiManager();
  try {
    var _widgetData$data;
    const response = await apiServerHostClient.get(`distribution/validateCode/returnResponse/${token}`);
    // Assuming Widget is the expected response type
    const widgetData = response.data;
    let embedSettings = widgetData === null || widgetData === void 0 || (_widgetData$data = widgetData.data) === null || _widgetData$data === void 0 || (_widgetData$data = _widgetData$data.distributionInfo) === null || _widgetData$data === void 0 ? void 0 : _widgetData$data.embedSettings;
    if (embedSettings !== null) {
      var _embedSettings$exclud, _embedSettings$includ;
      if ((embedSettings === null || embedSettings === void 0 || (_embedSettings$exclud = embedSettings.excludeSegment) === null || _embedSettings$exclud === void 0 || (_embedSettings$exclud = _embedSettings$exclud.list) === null || _embedSettings$exclud === void 0 ? void 0 : _embedSettings$exclud.length) > 0) {
        var _embedSettings$exclud2, _embedSettings$exclud3;
        storeData(Constant.EXCLUDED_LIST, embedSettings === null || embedSettings === void 0 || (_embedSettings$exclud2 = embedSettings.excludeSegment) === null || _embedSettings$exclud2 === void 0 ? void 0 : _embedSettings$exclud2.list);
        storeData(Constant.EXCLUDE_TYPE, embedSettings === null || embedSettings === void 0 || (_embedSettings$exclud3 = embedSettings.excludeSegment) === null || _embedSettings$exclud3 === void 0 ? void 0 : _embedSettings$exclud3.type);
      } else if (embedSettings !== null && embedSettings !== void 0 && (_embedSettings$includ = embedSettings.includeSegment) !== null && _embedSettings$includ !== void 0 && (_embedSettings$includ = _embedSettings$includ.list) !== null && _embedSettings$includ !== void 0 && _embedSettings$includ.length) {
        var _embedSettings$includ2, _embedSettings$includ3;
        storeData(Constant.INCLUDED_LIST, embedSettings === null || embedSettings === void 0 || (_embedSettings$includ2 = embedSettings.includeSegment) === null || _embedSettings$includ2 === void 0 ? void 0 : _embedSettings$includ2.list);
        storeData(Constant.INCLUDE_TYPE, embedSettings === null || embedSettings === void 0 || (_embedSettings$includ3 = embedSettings.includeSegment) === null || _embedSettings$includ3 === void 0 ? void 0 : _embedSettings$includ3.type);
      } else {
        var _embedSettings$exclud4, _embedSettings$includ4, _embedSettings$exclud5, _embedSettings$includ5;
        storeData(Constant.EXCLUDE_TYPE, embedSettings === null || embedSettings === void 0 || (_embedSettings$exclud4 = embedSettings.excludeSegment) === null || _embedSettings$exclud4 === void 0 ? void 0 : _embedSettings$exclud4.type);
        storeData(Constant.INCLUDE_TYPE, embedSettings === null || embedSettings === void 0 || (_embedSettings$includ4 = embedSettings.includeSegment) === null || _embedSettings$includ4 === void 0 ? void 0 : _embedSettings$includ4.type);
        storeData(Constant.EXCLUDED_LIST, embedSettings === null || embedSettings === void 0 || (_embedSettings$exclud5 = embedSettings.excludeSegment) === null || _embedSettings$exclud5 === void 0 ? void 0 : _embedSettings$exclud5.list);
        storeData(Constant.INCLUDED_LIST, embedSettings === null || embedSettings === void 0 || (_embedSettings$includ5 = embedSettings.includeSegment) === null || _embedSettings$includ5 === void 0 ? void 0 : _embedSettings$includ5.list);
      }
    }
    onWidgetSuccess(widgetData, isSurveyInitialize, isModalVisible, setOpenModal);
    return widgetData;
  } catch (error) {
    console.error('Error in hitSurveyActiveApi API call:', error);
    // Handle the error as needed
    throw error;
  }
};

//Create Contact API added and it needs to be added in the case of the startSurvey and different scenario of activity lifecycle
export const hitCreateContactAPI = async (hashMap, startSurvey) => {
  const apiServerHostClient = await ApiManager(false);
  try {
    var _response$data;
    const response = await apiServerHostClient.post(`contacts/tracking`, hashMap);
    // Assuming Widget is the expected response type
    const contactResponse = response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 || (_response$data = _response$data.data) === null || _response$data === void 0 ? void 0 : _response$data.contactInfo;
    if (contactResponse !== null && Object.keys(contactResponse).length) {
      if (contactResponse._id) {
        if (contactResponse.lists.length) {
          storeData(Constant.CONTACT_LIST, contactResponse.lists);
        }
        storeData(Constant.CONTACT_ID, contactResponse._id);
        onCreateCreatingSuccess(false, startSurvey);
      }
    } else if (contactResponse.evd !== null) {
      if (contactResponse.evd._id) {
        if (contactResponse.evd.lists !== null && contactResponse.evd.lists.length) {
          storeData(Constant.EVD_LIST, contactResponse.evd.lists);
        }
        storeData(Constant.EXTERNAL_VISITOR_ID, contactResponse.evd._id);
        onCreateCreatingSuccess(false, startSurvey);
      }
    }
    return response.data;
  } catch (error) {
    console.error('Error in hitCreateContactAPI API call:', error);
    // Handle the error as needed
    throw error;
  }
};
export const hitCreateContactApiDynamic = async (hashMap, startSurvey) => {
  const apiContactTrackingClient = await ApiManager(false);
  try {
    var _response$data2;
    const response = await apiContactTrackingClient.post(`contacts/tracking`, hashMap);

    // Assuming Widget is the expected response type
    const contactResponse = (_response$data2 = response.data) === null || _response$data2 === void 0 || (_response$data2 = _response$data2.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.contactInfo;
    if (contactResponse !== null && Object.keys(contactResponse).length) {
      if (contactResponse._id) {
        if (contactResponse.lists.length) {
          storeData(Constant.CONTACT_LIST, contactResponse.lists);
        }
        storeData(Constant.CONTACT_ID, contactResponse._id);
        onCreateCreatingSuccess(false, startSurvey);
      }
    } else if (contactResponse.evd !== null) {
      if (contactResponse.evd._id) {
        if (contactResponse.evd.lists !== null && contactResponse.evd.lists.length) {
          storeData(Constant.EVD_LIST, contactResponse.evd.lists);
        }
        storeData(Constant.EXTERNAL_VISITOR_ID, contactResponse.evd._id);
        onCreateCreatingSuccess(false, startSurvey);
      }
    }
    return response.data;
  } catch (error) {
    console.error('Error in API hitCreateContactApiDynamic call:', error);
    // Handle the error as needed
    throw error;
  }
};
export const hitSessionUpdateApi = async (token, updateSessionRequest) => {
  const apiServerHostClient = await ApiManager();
  try {
    const response = await apiServerHostClient.post(`contacts/sessionsUpdate/${token}`, updateSessionRequest);
    // Assuming Widget is the expected response type
    return response;
  } catch (error) {
    console.error('Error in hitSessionUpdateApi API call:', error);
    // Handle the error as needed
    throw error;
  }
};
export const hitSendEventToServerApi = async eventRequest => {
  const apiServerHostClient = await ApiManager();
  try {
    await apiServerHostClient.post(`surveys/logInteraction`, eventRequest);
    // Assuming Widget is the expected response type

    return '';
  } catch (error) {
    console.error('Error in hitSendEventToServerApi API call:', error);
    // Handle the error as needed
    throw error;
  }
};
export const getIpAddress = async () => {
  try {
    const response = await axios.get('https://api64.ipify.org?format=json');
    const ipAddress = response.data.ip;
    return ipAddress;
  } catch (error) {
    console.error('Error fetching IP address:', error);
    return null;
  }
};
//# sourceMappingURL=service.js.map