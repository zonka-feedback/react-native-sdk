import React, { useEffect } from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { useZFSurvey } from 'react-native-zonkafeedback';
// import LoginScreen from "./components/loginPage";

const ViewMo = () => {
  const { startSurvey, sendDeviceDetails, sendCustomAttributes, userInfo } =
    useZFSurvey();
  const onClick = async () => {
    const hashValue = {
      contact_mobile: '99999999',
      // contact_email: 'namixyz@gmail.com',
      contact_uniqueId: '123456789',
      // contact_name: 'Namish Garg',
    };
    const hashValue2 = {
      // contact_mobile: '99999999',
      contact_email: 'avanish.parashar@classicinformatics.com',
      // contact_uniqueId: '123456789',
      contact_name: 'Avanish Parashar',
    };
    // sendCustomAttributes(hashValue)
    //   .sendDeviceDetails(true)
    //   .startSurvey('Avanish');
    userInfo(hashValue2);
    sendCustomAttributes(hashValue2).sendDeviceDetails(true).startSurvey();
  };

  return (
    <View style={styles.container}>
      {/* <LoginScreen /> */}
      <Button title="Open Modal" onPress={onClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

export default ViewMo;
