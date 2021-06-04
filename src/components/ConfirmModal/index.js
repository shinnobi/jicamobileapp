import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import Button from '../Button';
import { styleSet, colorSet, fontSizeSet } from '../../AppStyles';
import { Languages, Device } from '../../utils/Omni';

class ConfirmModal extends React.Component{
    render() {
        const {
            isModalVisible,
            messageText,
            closeModal,
            onPressYes,
            onPressCancel,
            yesText,
            cancelText,
            style,
        } = this.props; 

        const { width: windowWidth, height: windowHeight } = Device.Window;

        const modalWidth = Math.min((windowWidth * 93) / 100, 400);
        return (
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={closeModal}
                swipeToClose={false}
                animationDuration={300}
                backdropOpacity={0.1}
                style={[
                    styleSet.modalBoxWrap,
                    {
                        height: 131,
                        top: (windowHeight *35) / 100,
                        width: modalWidth,
                        marginLeft: (windowWidth - modalWidth) / 2,
                        backgroundColor: 'rgba(51, 51, 51, 0.75)',
                    },
                    style && style,
                ]}
                >
                    <View style={styles.modalMessage}>
                        <Text style={styles.modalMessageText}>{messageText}</Text>
                    </View>
                    <View style={styles.modalActions}>
                        <Button
                            style={[styles.modalButton, styles.buttonNo]}
                            textStyle={styles.buttonText}
                            onPress={onPressCancel || closeModal}
                            text={cancelText || Languages.NO}
                        />
                        <Button 
                            style={[styles.modalButton, styles.buttonYes]}
                            textStyle={styles.buttonText}
                            onPress={onPressYes}
                            text={yesText || Languages.YES}
                        />
                    </View>
                </Modal>
        );
    }   
}

const styles = StyleSheet.create({
    modalMessage: {
      // flex: 1,
      height: 43,
      marginTop: 25,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalMessageText: {
      flex: 1,
      fontSize: fontSizeSet.subMiddle,
      fontStyle: 'italic',
      color: colorSet.white,
      textAlign: 'center',
    },
    modalActions: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15,
    },
    modalButton: {
      minWidth: 91,
      height: 43,
      justifyContent: 'center',
      textAlign: 'center',
      marginHorizontal: 15,
      borderRadius: 35,
    },
    buttonNo: {
      backgroundColor: colorSet.alternativeColor,
    },
    buttonYes: {
      backgroundColor: colorSet.activeColor,
    },
    buttonText: {
      fontSize: fontSizeSet.subMiddle,
      color: '#FFFFFF',
      letterSpacing: -0.1,
      textAlign: 'center',
    },
  });

  export default ConfirmModal;