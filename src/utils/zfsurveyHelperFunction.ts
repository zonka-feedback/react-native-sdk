import { Platform } from 'react-native';
import {
  hitCreateContactAPI,
  hitCreateContactApiDynamic,
} from '../services/service';
import {
  clearSpecificKey,
  getCookieId,
  retrieveData,
  storeData,
} from '../store/asyncStorage';
import AppUtils from './appUtils';
import Constant from './constant';

export const generateBaseUrl = (surveyToken: string, zfRegion: string) => {
  if (zfRegion && zfRegion.toUpperCase() === 'EU') {
    return Constant.HTTPS + 'e' + Constant.URL + surveyToken;
  }

  return Constant.HTTPS + 'us1' + Constant.URL + surveyToken;
  // return Constant.BASEURL + surveyToken;
};

export const generateSurveyUrl = (
  surveyToken: string,
  zfRegion: string,
  setBaseUrl: (value: string) => void
) => {
  if (surveyToken === '') {
    console.log(Constant.TAG, 'Token should not be empty');
    return;
  }
  const baseUrl = generateBaseUrl(surveyToken, zfRegion);

  setBaseUrl(baseUrl);
  return baseUrl;
};

export const getZfSurveyUrl = (baseUrl: string) => {
  const customVariableString = '?';
  return baseUrl + customVariableString;
};

export const userInfoData = (
  hashMap: any,
  token: string,
  startSurvey: any = null
) => {
  if (hashMap !== null && Object.keys(hashMap).length > 0) {
    Object.entries(hashMap).forEach(([key, value]) => {
      if (key === Constant.EMAIL_ID && value) {
        storeData(Constant.EMAIL_ID, value.toString());
      }
      if (key === Constant.MOBILE_NO && value) {
        storeData(Constant.MOBILE_NO, value.toString());
      }
      if (key === Constant.UNIQUE_ID && value) {
        storeData(Constant.UNIQUE_ID, value.toString());
      }
      if (key === Constant.CONTACT_NAME && value) {
        storeData(Constant.CONTACT_NAME, value.toString());
      }
    });
  }
  createContactForDynamicAttribute(hashMap, token, startSurvey);
};

export const createContactForDynamicAttribute = async (
  hashMap: any,
  token: string,
  // isContactCreated: boolean,
  startSurvey: () => void
) => {
  const ipAddess = await AppUtils.getLocalIpAddress();
  let hashMapData = {
    [Constant.COOKIE_ID]: await getCookieId(),
    [Constant.FIRST_SEEN]: await retrieveData(Constant.FIRST_SEEN),
    [Constant.REQUEST_TYPE]: Platform.OS,
    [Constant.LAST_SEEN]: AppUtils.getCurrentTime(
      Date.now(),
      Constant.DATE_FORMAT
    ),
    [Constant.IP_ADDRESS]: ipAddess,
  };
  if (await retrieveData(Constant.CONTACT_ID)) {
    hashMapData[Constant.CONTACT_ID] = await retrieveData(Constant.CONTACT_ID);
  } else {
    if (await retrieveData(Constant.EXTERNAL_VISITOR_ID)) {
      hashMapData[Constant.EXTERNAL_VISITOR_ID] = await retrieveData(
        Constant.EXTERNAL_VISITOR_ID
      );
    }
  }
  if (await retrieveData(Constant.EMAIL_ID)) {
    hashMapData[Constant.EMAIL_ID] = await retrieveData(Constant.EMAIL_ID);
  }
  if (await retrieveData(Constant.CONTACT_NAME)) {
    hashMapData[Constant.CONTACT_NAME] = await retrieveData(
      Constant.CONTACT_NAME
    );
  }
  if (await retrieveData(Constant.MOBILE_NO)) {
    hashMapData[Constant.MOBILE_NO] = await retrieveData(Constant.MOBILE_NO);
  }
  if (await retrieveData(Constant.UNIQUE_ID)) {
    hashMapData[Constant.UNIQUE_ID] = await retrieveData(Constant.UNIQUE_ID);
  }

  hashMapData = {
    ...hashMapData,
    ...{
      [Constant.IP_ADDRESS]: ipAddess,
      [Constant.UNIQUE_REF_CODE]: token,
      [Constant.JOB_TYPE]: 'sdktd',
      [Constant.COMPANY_ID]: await retrieveData(Constant.COMPANY_ID),
      [Constant.CONTACT_DEVICE_OS]: Platform.OS,
      [Constant.CONTACT_DEVICE_NAME]: Platform.OS,
      [Constant.CONTACT_DEVICE_MODEL]: Platform.OS,
      [Constant.CONTACT_DEVICE_BRAND]: Platform.OS,
      [Constant.CONTACT_DEVICE_OS_VERSION]: Platform.Version,
      [Constant.CONTACT_DEVICE]: AppUtils.isTablet() ? 'Tablet' : 'Mobile',
    },
  };
  const mergedHashData = { ...hashMap, ...hashMapData };
  await hitCreateContactApiDynamic(mergedHashData, startSurvey);
};
export const onCreateCreatingSuccess = async (
  isContactCreated: boolean,
  surveyStart: () => void
) => {
  if (isContactCreated) {
    await surveyStart();
  }
};

export const onWidgetSuccess = async (
  widget: any,
  isSurveyInitialize: boolean,
  isModalVisible: boolean,
  setOpenModal: (value: boolean) => void
) => {
  storeData(
    Constant.IS_WIDGET_ACTIVE,
    widget?.data?.distributionInfo?.isWidgetActive || false
  );
  storeData(
    Constant.COMPANY_ID,
    widget?.data?.distributionInfo?.companyId || ''
  );
  if (widget?.data?.distributionInfo?.isWidgetActive) {
    if (!isModalVisible && isSurveyInitialize) {
      const segmentAllowed = await checkSegmenting();
      if ((await retrieveData(Constant.EMAIL_ID)) != null) {
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

export const checkSegmenting = async () => {
  let processEmbedSurvey = true;
  let includedList: any[] = [];
  let excludedList: any[] = [];
  let contactResponseList: any[] = [];
  let evdResponseList: any[] = [];

  // const includeType = await retrieveData(Constant.INCLUDE_TYPE);
  // const excludeType = await retrieveData(Constant.EXCLUDE_TYPE);
  const includedListSet = await retrieveData(Constant.INCLUDED_LIST);
  if (includedListSet != null) {
    includedList = Array.from(includedListSet || []);
    // Clear the included list
    clearSpecificKey(Constant.INCLUDED_LIST);
  }

  const excludedListSet = await retrieveData(Constant.EXCLUDED_LIST);
  console.log('🚀 ~ checkSegmenting ~ excludedListSet:', excludedListSet);
  if (excludedListSet != null) {
    excludedList = Array.from(excludedListSet || []);
    // Clear the excluded list
    clearSpecificKey(Constant.EXCLUDED_LIST);
  }

  const contactListSet = await retrieveData(Constant.CONTACT_LIST);
  if (contactListSet != null) {
    contactResponseList = Array.from(contactListSet || []);
    console.log(
      '🚀 ~ checkSegmenting ~ contactResponseList:',
      contactResponseList
    );
  }

  const evdListSet = await retrieveData(Constant.EVD_LIST);
  if (evdListSet != null) {
    evdResponseList = Array.from(evdListSet || []);
  }

  // if (includeType === 'all') {
  //   processEmbedSurvey = true;
  // } else if (includeType === 'any') {
  //   console.log(includedList, 'includedList');
  //   if (includedList && includedList.length > 0) {
  //     processEmbedSurvey = false;
  //     console.log(contactResponseList, 'contactResponseList');
  //     if (contactResponseList && contactResponseList.length > 0) {
  //       console.log('run');
  //       for (let i = 0; i < contactResponseList.length; i++) {
  //         const segmentInContact = contactResponseList[i];
  //         console.log(
  //           '🚀 ~ checkSegmenting ~ segmentInContact:',
  //           segmentInContact
  //         );
  //         if (includedList.includes(segmentInContact)) {
  //           processEmbedSurvey = true;
  //           break;
  //         }
  //       }
  //     } else if (evdResponseList && evdResponseList.length > 0) {
  //       for (let i = 0; i < evdResponseList.length; i++) {
  //         const segmentInContact = evdResponseList[i];

  //         if (includedList.includes(segmentInContact)) {
  //           console.log(
  //             '🚀 ~ checkSegmenting ~ segmentInContact:',
  //             segmentInContact
  //           );
  //           processEmbedSurvey = true;
  //           break;
  //         }
  //       }
  //     }
  //   }
  // } else if (excludeType === 'all') {
  //   processEmbedSurvey = false;
  // } else if (excludeType === 'any') {
  //   console.log('object');
  //   if (excludedList && excludedList.length > 0) {
  //     console.log('🚀 ~ checkSegmenting ~ excludedList1234:', excludedList);
  //     if (contactResponseList && contactResponseList.length > 0) {
  //       for (let i = 0; i < contactResponseList.length; i++) {
  //         const segmentInContact = contactResponseList[i];
  //         console.log(
  //           '🚀 ~ checkSegmenting ~ segmentInContact:',
  //           segmentInContact
  //         );
  //         if (excludedList.includes(segmentInContact)) {
  //           console.log('excludedListCall');
  //           processEmbedSurvey = false;
  //           break;
  //         }
  //       }
  //     } else if (evdResponseList && evdResponseList.length > 0) {
  //       for (let i = 0; i < evdResponseList.length; i++) {
  //         const segmentInContact = evdResponseList[i];
  //         if (excludedList.includes(segmentInContact)) {
  //           processEmbedSurvey = false;
  //           break;
  //         }
  //       }
  //     }
  //   }
  // }
  if (includedList.length > 0) {
    // For contact users
    if (contactResponseList.length > 0) {
      contactResponseList.forEach((segmentInContact) => {
        if (includedList.includes(segmentInContact)) {
          processEmbedSurvey = true;
          return;
        }
      });
    }
    // For anonymous users
    else if (evdResponseList.length > 0) {
      evdResponseList.forEach((segmentInContact) => {
        if (includedList.includes(segmentInContact)) {
          processEmbedSurvey = true;
          return;
        }
      });
    }
  }
  // Check exclude segments
  if (excludedList.length > 0) {
    // For contact users
    if (contactResponseList.length > 0) {
      contactResponseList.forEach((segmentInContact) => {
        if (excludedList.includes(segmentInContact)) {
          processEmbedSurvey = false;
          return;
        }
      });
    }
    // For anonymous users
    else if (evdResponseList.length > 0) {
      evdResponseList.forEach((segmentInContact) => {
        if (excludedList.includes(segmentInContact)) {
          processEmbedSurvey = false;
          return;
        }
      });
    }
  }

  return processEmbedSurvey;
};

export const createContact = async (token: string, startSurvey: () => void) => {
  const ipAddess = await AppUtils.getLocalIpAddress();
  let hashMapData = {
    [Constant.COOKIE_ID]: await getCookieId(),
    [Constant.FIRST_SEEN]: await retrieveData(Constant.USER_FIRST_SEEN),
    [Constant.REQUEST_TYPE]: Platform.OS,
    [Constant.LAST_SEEN]: AppUtils.getCurrentTime(
      Date.now(),
      Constant.DATE_FORMAT
    ),
    [Constant.IP_ADDRESS]: ipAddess,
  };
  if (await retrieveData(Constant.CONTACT_ID)) {
    hashMapData[Constant.CONTACT_ID] = await retrieveData(Constant.CONTACT_ID);
  } else {
    if (await retrieveData(Constant.EXTERNAL_VISITOR_ID)) {
      hashMapData[Constant.EXTERNAL_VISITOR_ID] = await retrieveData(
        Constant.EXTERNAL_VISITOR_ID
      );
    }
  }
  if (await retrieveData(Constant.EMAIL_ID)) {
    hashMapData[Constant.EMAIL_ID] = await retrieveData(Constant.EMAIL_ID);
  }
  if (await retrieveData(Constant.CONTACT_NAME)) {
    hashMapData[Constant.CONTACT_NAME] = await retrieveData(
      Constant.CONTACT_NAME
    );
  }
  if (await retrieveData(Constant.MOBILE_NO)) {
    hashMapData[Constant.MOBILE_NO] = await retrieveData(Constant.MOBILE_NO);
  }
  if (await retrieveData(Constant.UNIQUE_ID)) {
    hashMapData[Constant.UNIQUE_ID] = await retrieveData(Constant.UNIQUE_ID);
  }

  hashMapData = {
    ...hashMapData,
    ...{
      [Constant.IP_ADDRESS]: ipAddess,
      [Constant.UNIQUE_REF_CODE]: token,
      [Constant.JOB_TYPE]: 'sdktd',
      [Constant.COMPANY_ID]: await retrieveData(Constant.COMPANY_ID),
      [Constant.CONTACT_DEVICE_OS]: Platform.OS,
      [Constant.CONTACT_DEVICE_NAME]: Platform.OS,
      [Constant.CONTACT_DEVICE_MODEL]: Platform.OS,
      [Constant.CONTACT_DEVICE_BRAND]: Platform.OS,
      [Constant.CONTACT_DEVICE_OS_VERSION]: Platform.Version,
      [Constant.CONTACT_DEVICE]: AppUtils.isTablet() ? 'Tablet' : 'Mobile',
    },
  };
  await hitCreateContactAPI(hashMapData, startSurvey);
};
