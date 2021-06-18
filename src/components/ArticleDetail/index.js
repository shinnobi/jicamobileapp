import React from 'react';
// import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import WebView from '../WebView';
import { Device } from '../../utils/Omni';
import { colorSet, styleSet } from '../../AppStyles';

export default class ArticleDetail extends React.Component {
  render() {
    const { article, isModalVisible, closeModal } = this.props;
    const { width: windowWidth, height: windowHeight } = Device.Window;
    const modalWidth = Math.min((windowWidth * 93) / 100, 400);

    return (
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        swipeToClose={false}
        animationDuration={300}
        backdropOpacity={0.1}
        position="top"
        style={[
          styleSet.modalBoxWrap,
          {
            height: '100%',
            top: (windowHeight * 35) / 100,
            width: modalWidth,
            marginLeft: (windowWidth - modalWidth) / 2,
            backgroundColor: colorSet.white,
          },
        ]}>
        <WebView textColor={colorSet.Text} fontSize={11} html={article} />
      </Modal>
    );
  }
}

// const styles = StyleSheet.create({
// });
