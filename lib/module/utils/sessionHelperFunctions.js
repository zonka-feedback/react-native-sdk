import { Platform } from 'react-native';
import { hitSessionUpdateApi } from '../services/service';
import { clearSpecificKey, retrieveData, storeData } from '../store/asyncStorage';
import AppUtils from './appUtils';
import Constant from './constant';
const getAllSessions = async () => {
  const sessionsJson = await retrieveData('sessions');
  return sessionsJson.length ? sessionsJson : [];
};
const getCurrentSession = async () => {
  const sessionList = await getAllSessions();
  if (!!sessionList.length) {
    return sessionList[0];
  } else {
    return null;
  }
};
const isLastSessionContinue = async () => {
  const currentSession = await getCurrentSession();
  if (currentSession != null) {
    return await AppUtils.calculateDifferenceTime(currentSession.endTime);
  } else {
    return false;
  }
};
export const sessionInsert = async (sessions, isApplicationExit, token) => {
  if ((await isLastSessionContinue()) && !isApplicationExit) {
    updateSession(true);
  } else {
    const allSessions = await getAllSessions();
    if (allSessions.length) {
      shareSession(token, allSessions);
    }
    insertSessionsToLocalStorage(sessions);
  }
};
const updateSession = async isLastSessionUpdate => {
  const currentSession = await getCurrentSession();
  if (currentSession != null) {
    let updatedSession = {
      ...currentSession
    };
    if (isLastSessionUpdate) {
      updatedSession.endTime = 0;
    } else {
      if ((updatedSession === null || updatedSession === void 0 ? void 0 : updatedSession.endTime) === 0) {
        const sessionEndTime = new Date().getTime();
        storeData(Constant.SESSION_END_TIME, sessionEndTime);
        updatedSession.endTime = sessionEndTime;
      }
    }
    // storeData('sessions', updatedSession);
  }
};
const insertSessionsToLocalStorage = async newSessions => {
  const allSessions = await getAllSessions();
  const updatedSessions = [...allSessions, newSessions];
  storeData('sessions', updatedSessions);
};

// export const onSessionSave = (idList) => {
//   // SessionDatabase.databaseWriteExecutor.execute(() -> {
//   //     for (int i = 0; i < idList.size(); i++) {
//   //         sessionDao.deleteSessions(idList.get(i));
//   //     }
//   // });
// };

export const shareSession = async (token, allSessions) => {
  // const getAllSession = await getAllSessions();
  if (allSessions.length) {
    if (await AppUtils.isNetworkConnected()) {
      updateSessionToServer(token, allSessions);
    }
  }
};
const updateSessionToServer = async (token, allSessions) => {
  const sessionRequest = {
    deviceType: Platform.OS,
    sessionLogs: []
  };
  allSessions.forEach(async session => {
    const contactId = await retrieveData(Constant.CONTACT_ID);
    const anonymousVisitorId = await retrieveData(Constant.EXTERNAL_VISITOR_ID);
    if (session.endTime !== 0) {
      var _sessionRequest$sessi;
      const sessionLog = {
        sessionStartedAt: AppUtils.getCurrentTime(session.startTime, Constant.DATE_FORMAT),
        sessionClosedAt: AppUtils.getCurrentTime(session.endTime, Constant.DATE_FORMAT),
        uniqueSessId: session.id,
        cookieId: await retrieveData(Constant.COOKIE_ID),
        ipAddress: await AppUtils.getLocalIpAddress(),
        ...(contactId ? {
          contactId: contactId
        } : {
          anonymousVisitorId: anonymousVisitorId
        })
      };
      sessionRequest === null || sessionRequest === void 0 || (_sessionRequest$sessi = sessionRequest.sessionLogs) === null || _sessionRequest$sessi === void 0 || _sessionRequest$sessi.push(sessionLog);
    }
  });
  hitSessionUpdateApi(token, sessionRequest).then(() => {
    clearSpecificKey('sessions');
  }).catch(() => {
    // Handle failure
  });
};

// export const sendEventToServer = async (token: string) => {
//   const contactId = await retrieveData(Constant.CONTACT_ID);
//   const anonymousVisitorId = await retrieveData(Constant.EXTERNAL_VISITOR_ID);
//   const eventRequest: any = {
//     surveyRefCode: token,
//     ipAddress: await AppUtils.getLocalIpAddress(),
//     device: Platform.OS,
//     deviceSerialNumber: AppUtils.getDeviceSerial(),
//     deviceBrand: "",
//     deviceModel: "",
//     deviceName: "",
//     deviceOS: Platform.OS,
//     deviceOSVersion: "",
//     ...(contactId
//       ? { contactId: contactId }
//       : { anonymousVisitorId: anonymousVisitorId }),
//   };

//   hitSendEventToServerApi(eventRequest)
//     .then((eventRequest: any) => {
//       console.log("🚀 ~ .then ~ eventRequest:", eventRequest);
//     })
//     .catch((error) => {
//       // Handle failure
//     });
// };
//# sourceMappingURL=sessionHelperFunctions.js.map