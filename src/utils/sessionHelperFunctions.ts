import { Platform } from 'react-native';
import { hitSessionUpdateApi } from '../services/service';

import {
  clearSpecificKey,
  retrieveData,
  storeData,
} from '../store/asyncStorage';
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

export const sessionInsert = async (
  sessions: any,
  isApplicationExit: boolean,
  token: string
) => {
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

const updateSession = async (isLastSessionUpdate: boolean) => {
  const currentSession = await getCurrentSession();
  if (currentSession != null) {
    let updatedSession = { ...currentSession };
    if (isLastSessionUpdate) {
      updatedSession.endTime = 0;
    } else {
      if (updatedSession?.endTime === 0) {
        const sessionEndTime = new Date().getTime();
        storeData(Constant.SESSION_END_TIME, sessionEndTime);
        updatedSession.endTime = sessionEndTime;
      }
    }
    // storeData('sessions', updatedSession);
  }
};

const insertSessionsToLocalStorage = async (newSessions: any) => {
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

export const shareSession = async (token: string, allSessions: any) => {
  // const getAllSession = await getAllSessions();
  if (allSessions.length) {
    if (await AppUtils.isNetworkConnected()) {
      updateSessionToServer(token, allSessions);
    }
  }
};

const updateSessionToServer = async (token: string, allSessions: any) => {
  const sessionRequest: { deviceType: string; sessionLogs: any } = {
    deviceType: Platform.OS,
    sessionLogs: [],
  };

  allSessions.forEach(
    async (session: { endTime: any; startTime: any; id: any }) => {
      const contactId = await retrieveData(Constant.CONTACT_ID);
      const anonymousVisitorId = await retrieveData(
        Constant.EXTERNAL_VISITOR_ID
      );
      if (session.endTime !== 0) {
        const sessionLog: any = {
          sessionStartedAt: AppUtils.getCurrentTime(
            session.startTime,
            Constant.DATE_FORMAT
          ),
          sessionClosedAt: AppUtils.getCurrentTime(
            session.endTime,
            Constant.DATE_FORMAT
          ),
          uniqueSessId: session.id,
          cookieId: await retrieveData(Constant.COOKIE_ID),
          ipAddress: await AppUtils.getLocalIpAddress(),

          ...(contactId
            ? { contactId: contactId }
            : { anonymousVisitorId: anonymousVisitorId }),
        };

        sessionRequest?.sessionLogs?.push(sessionLog);
      }
    }
  );

  hitSessionUpdateApi(token, sessionRequest)
    .then(() => {
      clearSpecificKey('sessions');
    })
    .catch(() => {
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
