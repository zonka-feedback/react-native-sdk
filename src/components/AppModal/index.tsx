import React, { memo, useContext } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import AppWebView from '../AppWebView';
import Constant from '../../utils/constant';
import { SDKContext } from '../../layout/SdkProvider';

const AppModal = ({ modalVisible = false }) => {
  const { url, setOpenModal, surveyExpand, setSurveyExpand } =
    useContext(SDKContext);
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.buttonClose, { top: surveyExpand ? -55 : -20 }]}
              onPress={() => {
                setSurveyExpand(false);
                setOpenModal(false);
              }}
            >
              <Svg width={24} height={24} viewBox="0 0 455.111 455.111">
                <Circle cx={227.556} cy={227.556} r={227.556} fill="#000000" />
                <Path
                  d="M227.556,227.556m-227.556,0a227.556,227.556 0,1 1,455.112 0a227.556,227.556 0,1 1,-455.112 0"
                  fill="#000000"
                />
                <Path
                  d="M455.111,227.556c0,125.156 -102.4,227.556 -227.556,227.556c-72.533,0 -136.533,-32.711 -177.778,-85.333c38.4,31.289 88.178,49.778 142.222,49.778c125.156,0 227.556,-102.4 227.556,-227.556c0,-54.044 -18.489,-103.822 -49.778,-142.222C422.4,91.022 455.111,155.022 455.111,227.556z"
                  fill="#000000"
                />
                <Path
                  d="M331.378,331.378c-8.533,8.533 -22.756,8.533 -31.289,0l-72.533,-72.533l-72.533,72.533c-8.533,8.533 -22.756,8.533 -31.289,0c-8.533,-8.533 -8.533,-22.756 0,-31.289l72.533,-72.533l-72.533,-72.533c-8.533,-8.533 -8.533,-22.756 0,-31.289c8.533,-8.533 22.756,-8.533 31.289,0l72.533,72.533l72.533,-72.533c8.533,-8.533 22.756,-8.533 31.289,0c8.533,8.533 8.533,22.756 0,31.289l-72.533,72.533l72.533,72.533C339.911,308.622 339.911,322.844 331.378,331.378z"
                  fill="#FFFFFF"
                />
              </Svg>
            </Pressable>

            <AppWebView uri={`${url}${Constant.EMBED_URL}`} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark black background
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    position: 'relative',
    width: 320,

    height: 250,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    zIndex: 1000,
    position: 'absolute',
    top: -55,

    right: 15,
  },
  crossImg: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default memo(AppModal);
