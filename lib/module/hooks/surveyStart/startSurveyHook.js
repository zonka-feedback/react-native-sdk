import { useContext } from 'react';
import { Alert } from 'react-native';
import { SDKContext } from '../../layout/SdkProvider';
import { hitSurveyActiveApi } from '../../services/service';
import { clearAsyncData, retrieveData, saveCookieId, saveFirstSeen } from '../../store/asyncStorage';
import AppUtils from '../../utils/appUtils';
import Constant from '../../utils/constant';
import { checkSegmenting, createContact, userInfoData } from '../../utils/zfsurveyHelperFunction';
import { useZfSurveyUrlCreate } from '../zfSurveyUrlCreation/zfSurveyUrlCreateHook';
export const useZFSurvey = () => {
  const {
    token,
    openModal,
    baseUrl,
    setOpenModal
  } = useContext(SDKContext);
  const showAlert = () => Alert.alert('Warning', 'Call init method first and pass token and region', [{
    text: 'Cancel',
    style: 'cancel'
  }], {
    cancelable: true
  });
  const {
    getZonkaFeedbackSurveyUrlString
  } = useZfSurveyUrlCreate();
  const startSurvey = async (isDeviceDetail = false, sendCustomAttribute = {}) => {
    if (token) {
      if (await AppUtils.isNetworkConnected()) {
        getZonkaFeedbackSurveyUrlString(token, baseUrl, isDeviceDetail, sendCustomAttribute);
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
        }
      }
    } else {
      showAlert();
    }
  };
  const sendCustomAttributes = hashMap => {
    return {
      sendDeviceDetails: isDeviceDetail => {
        return {
          startSurvey: () => startSurvey(isDeviceDetail, hashMap)
        };
      },
      startSurvey: () => startSurvey(false, hashMap)
    };
  };
  const sendDeviceDetails = async isDeviceDetail => {
    return {
      sendCustomAttributes: hashMap => {
        return {
          startSurvey: () => startSurvey(isDeviceDetail, hashMap)
        };
      },
      startSurvey: () => startSurvey(isDeviceDetail, {})
    };
  };
  const userInfo = hashMap => {
    userInfoData(hashMap, token, startSurvey);
    return {
      sendDeviceDetails: isDeviceDetail => {
        return {
          startSurvey: () => startSurvey(isDeviceDetail, hashMap)
        };
      },
      startSurvey: () => startSurvey(false, hashMap)
    };
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
    clear: logout
  };
};
//# sourceMappingURL=startSurveyHook.js.map