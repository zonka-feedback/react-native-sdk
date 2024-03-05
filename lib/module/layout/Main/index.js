import React, { memo, useContext, useEffect, useRef } from 'react';
import AppModal from '../../components/AppModal';
import { AppState, View } from 'react-native';
import { useInitializeZFSdk } from './hook';
import { SDKContext } from '../SdkProvider';
import { useZFSurvey } from '../../hooks';
import { createContact } from '../../utils/zfsurveyHelperFunction';
import AppUtils from '../../utils/appUtils';
import { sessionInsert } from '../../utils/sessionHelperFunctions';
const Main = ({
  children
}) => {
  const {
    init
  } = useInitializeZFSdk();
  const {
    startSurvey
  } = useZFSurvey();
  const isPaused = useRef(false);
  const syncingAllowedHandler = useRef(null);
  const check = useRef(null);
  const isForeground = useRef(false);
  const isApplicationExit = useRef(false);
  const {
    token,
    region,
    openModal,
    url
  } = useContext(SDKContext);
  useEffect(() => {
    init(token, region);
  }, []);
  const handleAppStateChange = newState => {
    if (token && url) {
      if (newState === 'active') {
        onActivityResumed();
      } else if (newState === 'background') {
        onActivityPaused();
      }
    }
  };

  //When activity resumed
  const onActivityResumed = () => {
    isForeground.current = false;
    const wasBackground = !isForeground.current;
    isForeground.current = true;
    if (check.current) {
      clearTimeout(check.current);
    }
    if (wasBackground) {
      if (token) {
        createContact(token, startSurvey);
      }
      if (syncingAllowedHandler.current) {
        clearTimeout(syncingAllowedHandler.current);
        syncingAllowedHandler.current = null;
      }
      // Replace with your React Native logic for Sessions
      const sessions = {
        startTime: new Date().getTime(),
        id: `ad-${new Date().getTime()}${AppUtils.getCookieId(14)}`,
        endTime: 0
      };
      sessionInsert(sessions, isApplicationExit.current, token);
      isApplicationExit.current = false;
    }
  };
  const onActivityPaused = () => {
    isPaused.current = true;
    if (check.current) {
      clearTimeout(check.current);
    }
    setTimeout(() => {
      // if (isForeground.current && isPaused.current) {
      console.log('call after timeout');
      if (isPaused.current) {
        isForeground.current = false;
        isApplicationExit.current = false;
        if (token) {
          createContact(token, startSurvey);
          // createContact implementation
        }
      }
    }, 10000);
  };
  const onActivityDestroyed = () => {
    isApplicationExit.current = true;
    if (syncingAllowedHandler.current) {
      clearTimeout(syncingAllowedHandler.current);
      syncingAllowedHandler.current = null;
    }
  };
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      handleAppStateChange(nextAppState);
    });
    if (check.current) {
      clearTimeout(check.current);
    }
    if (syncingAllowedHandler.current) {
      clearTimeout(syncingAllowedHandler.current);
    }
    return () => {
      isApplicationExit.current = true;
      subscription.remove();
      onActivityDestroyed();
    };
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, children, /*#__PURE__*/React.createElement(View, null, openModal && /*#__PURE__*/React.createElement(AppModal, {
    modalVisible: openModal
  })));
};
export default /*#__PURE__*/memo(Main);
//# sourceMappingURL=index.js.map