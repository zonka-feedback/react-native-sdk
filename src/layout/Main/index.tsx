import React, { memo, useContext, useEffect, useRef } from 'react';
import AppModal from '../../components/AppModal';
import { AppState, View } from 'react-native';

import { useInitializeZFSdk } from './hook';
import { SDKContext } from '../SdkProvider';
import { useZFSurvey } from '../../hooks';
import { createContact } from '../../utils/zfsurveyHelperFunction';
import AppUtils from '../../utils/appUtils';
import BackgroundTimer from 'react-native-background-timer';
import { sessionInsert } from '../../utils/sessionHelperFunctions';

type MainProps = {
  children: React.ReactNode;
};

const Main = ({ children }: MainProps) => {
  const { init } = useInitializeZFSdk();
  const { startSurvey } = useZFSurvey();
  const isPaused = useRef<boolean>(false);
  const check = useRef<NodeJS.Timeout | null>(null);
  const isForeground = useRef<boolean>(false);
  const isApplicationExit = useRef<boolean>(false);
  const { token, region, openModal } = useContext(SDKContext);
  let intervalId: any;
  useEffect(() => {
    init(token, region);
  }, []);

  const handleAppStateChange = (newState: string) => {
    if (token) {
      if (newState === 'active') {
        onActivityResumed();
      } else if (newState === 'background') {
        isPaused.current = true;
        intervalId = BackgroundTimer.setTimeout(() => {
          onActivityPaused();
        }, 500);
      }
    }
  };

  //When activity resumed
  const onActivityResumed = () => {
    isForeground.current = true;

    intervalId && BackgroundTimer.clearTimeout(intervalId);
    if (isForeground.current) {
      if (token) {
        createContact(token, startSurvey);
      }

      // Replace with your React Native logic for Sessions
      const sessions = {
        startTime: new Date().getTime(),
        id: `ad-${new Date().getTime()}${AppUtils.getCookieId(14)}`,
        endTime: 0,
      };

      sessionInsert(sessions, isApplicationExit.current, token);

      isApplicationExit.current = false;
    }
  };

  const onActivityPaused = () => {
    if (isPaused.current) {
      isForeground.current = false;
      isApplicationExit.current = false;

      if (token) {
        createContact(token, startSurvey);
      }
    }
  };
  const onActivityDestroyed = () => {
    isApplicationExit.current = true;
  };
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      handleAppStateChange(nextAppState);
    });
    if (check.current) {
      clearTimeout(check.current);
    }

    return () => {
      isApplicationExit.current = true;
      subscription.remove();
      onActivityDestroyed();
    };
  }, []);

  return (
    <>
      {children}
      <View>{openModal && <AppModal modalVisible={openModal} />}</View>
    </>
  );
};

export default memo(Main);
