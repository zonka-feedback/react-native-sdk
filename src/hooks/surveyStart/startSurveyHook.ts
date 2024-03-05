import { useContext } from 'react';
import { Alert } from 'react-native';
import { SDKContext } from '../../layout/SdkProvider';
import { hitSurveyActiveApi } from '../../services/service';

import {
  clearAsyncData,
  retrieveData,
  saveCookieId,
  saveFirstSeen,
  storeData,
} from '../../store/asyncStorage';
import AppUtils from '../../utils/appUtils';
import Constant from '../../utils/constant';
import {
  checkSegmenting,
  createContact,
  userInfoData,
} from '../../utils/zfsurveyHelperFunction';
import { useZfSurveyUrlCreate } from '../zfSurveyUrlCreation/zfSurveyUrlCreateHook';

export const useZFSurvey = () => {
  const { token, openModal, baseUrl, setOpenModal } = useContext(SDKContext);

  const showAlert = () =>
    Alert.alert(
      'Warning',
      'Please pass token and region from Zonka Provider Wrapper',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      }
    );
  const { getZonkaFeedbackSurveyUrlString } = useZfSurveyUrlCreate();

  const startSurvey = async (
    isDeviceDetail = false,
    sendCustomAttribute = {}
  ) => {
    if (token) {
      if (await AppUtils.isNetworkConnected()) {
        getZonkaFeedbackSurveyUrlString(
          token,
          baseUrl,
          isDeviceDetail,
          sendCustomAttribute
        );
        if (!(await retrieveData(Constant.CONTACT_ID))) {
          if (!(await retrieveData(Constant.EXTERNAL_VISITOR_ID))) {
            createContact(token, startSurvey);
          } else {
            await hitSurveyActiveApi(token, true, openModal, setOpenModal);
          }
        } else {
          await hitSurveyActiveApi(token, true, openModal, setOpenModal);
        }
      } else {
        return;
      }
      if (await retrieveData(Constant.IS_WIDGET_ACTIVE)) {
        const segmentAllowed = await checkSegmenting();
        if (segmentAllowed) {
          setOpenModal(true);
        } else {
          console.log('segment Not Allowed');
        }
      }
    } else {
      showAlert();
    }
  };

  const sendCustomAttributes = (hashMap: any) => {
    return {
      sendDeviceDetails: (isDeviceDetail: boolean) => {
        return {
          startSurvey: (screenName: string = '') =>
            getScreenNameStartSurvey(screenName, isDeviceDetail, hashMap),
        };
      },
      startSurvey: (screenName: string = '') =>
        getScreenNameStartSurvey(screenName, false, hashMap),
    };
  };
  const sendDeviceDetails = (isDeviceDetail: boolean) => {
    return {
      sendCustomAttributes: (hashMap: any) => {
        return {
          startSurvey: (screenName: string = '') =>
            getScreenNameStartSurvey(screenName, isDeviceDetail, hashMap),
        };
      },
      startSurvey: (screenName: string = '') =>
        getScreenNameStartSurvey(screenName, isDeviceDetail, {}),
    };
  };
  const userInfo = (hashMap: {} | undefined) => {
    userInfoData(hashMap, token, startSurvey);
    return {
      sendDeviceDetails: (isDeviceDetail: boolean) => {
        return {
          startSurvey: (screenName: string = '') =>
            getScreenNameStartSurvey(screenName, isDeviceDetail, hashMap),
        };
      },
      startSurvey: (screenName: string = '') =>
        getScreenNameStartSurvey(screenName, false, hashMap),
    };
  };

  const getScreenNameStartSurvey = (
    screenName: string,
    isDeviceDetail: boolean | undefined,
    hashMap: {} | undefined
  ) => {
    storeData(Constant.SCREEN_NAME, screenName);
    startSurvey(isDeviceDetail, hashMap);
  };

  const logout = () => {
    clearAsyncData();
    saveCookieId();
    saveFirstSeen();
  };

  return {
    startSurvey,
    sendCustomAttributes,
    sendDeviceDetails,
    userInfo,
    clear: logout,
  };
};
