import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
const AppWebView = ({
  uri
}) => {
  const disableZoomScript = `
  const meta = document.createElement('meta');
  meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
  meta.setAttribute('name', 'viewport');
  document.getElementsByTagName('head')[0].appendChild(meta);
`;
  const indicatorLoadingView = () => {
    return /*#__PURE__*/React.createElement(ActivityIndicator, {
      color: "#3235fd",
      size: "large",
      style: styles.IndicatorStyle
    });
  };
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.cardView
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.frameLayout
  }, /*#__PURE__*/React.createElement(WebView, {
    javaScriptEnabled: true,
    scalesPageToFit: true,
    domStorageEnabled: true
    // onNavigationStateChange={(e) => {
    //   console.log(e);
    // }}
    ,
    injectedJavaScript: disableZoomScript,
    renderLoading: indicatorLoadingView,
    startInLoadingState: true,
    source: {
      uri: uri
    },
    style: styles.webview
  }))));
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardView: {
    marginTop: 15,
    borderRadius: 8,
    width: 320,
    height: 280,
    elevation: 10,
    overflow: 'hidden'
  },
  frameLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  webview: {
    flex: 1,
    width: 320,
    height: 280
  },
  IndicatorStyle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});
export default AppWebView;
//# sourceMappingURL=index.js.map