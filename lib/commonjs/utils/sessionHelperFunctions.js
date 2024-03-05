"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shareSession = exports.sessionInsert = void 0;
var _reactNative = require("react-native");
var _service = require("../services/service");
var _asyncStorage = require("../store/asyncStorage");
var _appUtils = _interopRequireDefault(require("./appUtils"));
var _constant = _interopRequireDefault(require("./constant"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getAllSessions = async () => {
  const sessionsJson = await (0, _asyncStorage.retrieveData)('sessions');
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
    return await _appUtils.default.calculateDifferenceTime(currentSession.endTime);
  } else {
    return false;
  }
};
const sessionInsert = async (sessions, isApplicationExit, token) => {
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
exports.sessionInsert = sessionInsert;
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
        (0, _asyncStorage.storeData)(_constant.default.SESSION_END_TIME, sessionEndTime);
        updatedSession.endTime = sessionEndTime;
      }
    }
    // storeData('sessions', updatedSession);
  }
};
const insertSessionsToLocalStorage = async newSessions => {
  const allSessions = await getAllSessions();
  const updatedSessions = [...allSessions, newSessions];
  (0, _asyncStorage.storeData)('sessions', updatedSessions);
};

// export const onSessionSave = (idList) => {
//   // SessionDatabase.databaseWriteExecutor.execute(() -> {
//   //     for (int i = 0; i < idList.size(); i++) {
//   //         sessionDao.deleteSessions(idList.get(i));
//   //     }
//   // });
// };

const shareSession = async (token, allSessions) => {
  // const getAllSession = await getAllSessions();
  if (allSessions.length) {
    if (await _appUtils.default.isNetworkConnected()) {
      updateSessionToServer(token, allSessions);
    }
  }
};
exports.shareSession = shareSession;
const updateSessionToServer = async (token, allSessions) => {
  const sessionRequest = {
    deviceType: _reactNative.Platform.OS,
    sessionLogs: []
  };
  allSessions.forEach(async session => {
    const contactId = await (0, _asyncStorage.retrieveData)(_constant.default.CONTACT_ID);
    const anonymousVisitorId = await (0, _asyncStorage.retrieveData)(_constant.default.EXTERNAL_VISITOR_ID);
    if (session.endTime !== 0) {
      var _sessionRequest$sessi;
      const sessionLog = {
        sessionStartedAt: _appUtils.default.getCurrentTime(session.startTime, _constant.default.DATE_FORMAT),
        sessionClosedAt: _appUtils.default.getCurrentTime(session.endTime, _constant.default.DATE_FORMAT),
        uniqueSessId: session.id,
        cookieId: await (0, _asyncStorage.retrieveData)(_constant.default.COOKIE_ID),
        ipAddress: await _appUtils.default.getLocalIpAddress(),
        ...(contactId ? {
          contactId: contactId
        } : {
          anonymousVisitorId: anonymousVisitorId
        })
      };
      sessionRequest === null || sessionRequest === void 0 || (_sessionRequest$sessi = sessionRequest.sessionLogs) === null || _sessionRequest$sessi === void 0 || _sessionRequest$sessi.push(sessionLog);
    }
  });
  (0, _service.hitSessionUpdateApi)(token, sessionRequest).then(() => {
    (0, _asyncStorage.clearSpecificKey)('sessions');
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