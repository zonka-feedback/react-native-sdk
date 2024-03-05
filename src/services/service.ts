import axios from 'axios';
import { storeData } from '../store/asyncStorage';
import Constant from '../utils/constant';
import {
  onCreateCreatingSuccess,
  onWidgetSuccess,
} from './../utils/zfsurveyHelperFunction';
import { ApiManager } from './apiManager';

export const hitSurveyActiveApi = async (
  token: string,
  isSurveyInitialize: boolean,
  isModalVisible: boolean,
  setOpenModal: (value: boolean) => void
) => {
  const apiServerHostClient = await ApiManager();

  try {
    const response = await apiServerHostClient.get(
      `distribution/validateCode/returnResponse/${token}`
    );
    // Assuming Widget is the expected response type
    const widgetData = response.data;
    let embedSettings = widgetData?.data?.distributionInfo?.embedSettings;

    if (embedSettings !== null) {
      if (embedSettings?.excludeSegment?.list?.length > 0) {
        storeData(Constant.EXCLUDED_LIST, embedSettings?.excludeSegment?.list);
        storeData(Constant.EXCLUDE_TYPE, embedSettings?.excludeSegment?.type);
      } else if (embedSettings?.includeSegment?.list?.length) {
        storeData(Constant.INCLUDED_LIST, embedSettings?.includeSegment?.list);
        storeData(Constant.INCLUDE_TYPE, embedSettings?.includeSegment?.type);
      } else {
        storeData(Constant.EXCLUDE_TYPE, embedSettings?.excludeSegment?.type);
        storeData(Constant.INCLUDE_TYPE, embedSettings?.includeSegment?.type);
        storeData(Constant.EXCLUDED_LIST, embedSettings?.excludeSegment?.list);
        storeData(Constant.INCLUDED_LIST, embedSettings?.includeSegment?.list);
      }
    }
    onWidgetSuccess(
      widgetData,
      isSurveyInitialize,
      isModalVisible,
      setOpenModal
    );
    return widgetData;
  } catch (error) {
    //console.error('Error in hitSurveyActiveApi API call:', error);
    // Handle the error as needed
    throw error;
  }
};

//Create Contact API added and it needs to be added in the case of the startSurvey and different scenario of activity lifecycle
export const hitCreateContactAPI = async (
  hashMap: any,
  startSurvey: () => void
) => {
  const apiServerHostClient = await ApiManager(false);
  try {
    const response = await apiServerHostClient.post(
      `contacts/tracking`,
      hashMap
    );
    // Assuming Widget is the expected response type
    const contactResponse = response?.data?.data?.contactInfo;
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
        if (
          contactResponse.evd.lists !== null &&
          contactResponse.evd.lists.length
        ) {
          storeData(Constant.EVD_LIST, contactResponse.evd.lists);
        }
        storeData(Constant.EXTERNAL_VISITOR_ID, contactResponse.evd._id);
        onCreateCreatingSuccess(false, startSurvey);
      }
    }
    return response.data;
  } catch (error) {
    //console.error('Error in hitCreateContactAPI API call:', error);
    // Handle the error as needed
    throw error;
  }
};

export const hitCreateContactApiDynamic = async (
  hashMap: any,
  startSurvey: () => void
) => {
  const apiContactTrackingClient = await ApiManager(false);
  try {
    const response = await apiContactTrackingClient.post(
      `contacts/tracking`,
      hashMap
    );

    // Assuming Widget is the expected response type
    const contactResponse = response.data?.data?.contactInfo;
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
        if (
          contactResponse.evd.lists !== null &&
          contactResponse.evd.lists.length
        ) {
          storeData(Constant.EVD_LIST, contactResponse.evd.lists);
        }
        storeData(Constant.EXTERNAL_VISITOR_ID, contactResponse.evd._id);
        onCreateCreatingSuccess(false, startSurvey);
      }
    }
    return response.data;
  } catch (error) {
    //console.error('Error in API hitCreateContactApiDynamic call:', error);
    // Handle the error as needed
    throw error;
  }
};

export const hitSessionUpdateApi = async (
  token: string,
  updateSessionRequest: any
) => {
  const apiServerHostClient = await ApiManager();
  try {
    const response = await apiServerHostClient.post(
      `contacts/sessionsUpdate/${token}`,
      updateSessionRequest
    );
    // Assuming Widget is the expected response type
    return response;
  } catch (error) {
    //console.error('Error in hitSessionUpdateApi API call:', error);
    // Handle the error as needed
    throw error;
  }
};

export const hitSendEventToServerApi = async (
  eventRequest: any
  // dispatch: AppDispatch
) => {
  const apiServerHostClient = await ApiManager();
  try {
    await apiServerHostClient.post(`surveys/logInteraction`, eventRequest);
    // Assuming Widget is the expected response type

    return '';
  } catch (error) {
    //console.error('Error in hitSendEventToServerApi API call:', error);
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
    //console.error('Error fetching IP address:', error);
    return null;
  }
};
