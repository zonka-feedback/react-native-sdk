import React, { useContext } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { SDKContext } from '../../layout/SdkProvider';
import Constant from '../../utils/constant';

const AppWebView = ({ uri }: { uri: string }) => {
  const { setOpenModal, setSurveyExpand, surveyExpand } =
    useContext(SDKContext);
  const disableZoomScript = `
  const meta = document.createElement('meta');
  meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
  meta.setAttribute('name', 'viewport');
  document.getElementsByTagName('head')[0].appendChild(meta);
  return true;
`;

  const indicatorLoadingView = () => {
    return (
      <ActivityIndicator
        color="#3235fd"
        size="large"
        style={styles.IndicatorStyle}
      />
    );
  };

  const handleMessage = (e: { nativeEvent: { data: string } }) => {
    const message = e.nativeEvent.data;
    if (message === Constant.SURVEY_CLOSE) {
      setOpenModal(false);
    }
    if (message === Constant.SURVEY_EXPAND) {
      setSurveyExpand(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.cardView, { height: surveyExpand ? 350 : 280 }]}>
        <View style={styles.frameLayout}>
          <WebView
            javaScriptEnabled={true}
            scalesPageToFit={true}
            domStorageEnabled={true}
            onMessage={handleMessage}
            injectedJavaScript={disableZoomScript}
            renderLoading={indicatorLoadingView}
            startInLoadingState={true}
            source={{ uri: uri }}
            style={[styles.webview, { height: surveyExpand ? 350 : 280 }]}
          />
          {/* <ProgressBar
            style={styles.progressBar}
            progress={0}
            indeterminateTint="#1BC3F4"
            progressTint="#1BC3F4"
          /> */}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    marginTop: 15,
    borderRadius: 8,
    width: 320,
    // height: 280,
    elevation: 10,
    overflow: 'hidden',
  },
  frameLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
    width: 320,
    // height: 280,
  },
  IndicatorStyle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default AppWebView;
