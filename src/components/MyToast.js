import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {isObject} from 'lodash';
import {actions as toastAction} from '../redux/ToastRedux';
import Constants from '../utils/Constants';
import Device from '../utils/Device';
import {EventEmitter, Timer} from '../utils/Omni';

class MyToast extends React.Component {
  constructor(props) {
    super(props);
    this.nextToastId = 0;
    this.renderToast = this.renderToast.bind(this);
  }

  componentDidMount() {
    this.toastListener = EventEmitter.addListener(
      Constants.EmitCode.Toast,
      this,
    );
  }

  componentWillUnmount() {
    if (this.toastListener) {
      this.toastListener.remove();
    }
  }

  shouldComponentUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  render() {
    const {toast} = this.props;
    const {width: windowWidth, height: windowHeight} = Device.Window;
    return (
      <View style={styles.container(windowWidth, windowHeight)}>
        {toast.list.map(this.renderToast)}
      </View>
    );
  }

  renderToast(msg, index) {
    if ((msg && !msg.msg) || (msg && isObject(msg.msg))) {
      return null;
    }

    const {removeToast} = this.props;
    const onPress = () => removeToast(msg.key);
    return (
      <TouchableOpacity
        key={index}
        style={StyleSheet.textWrap}
        onPress={onPress}>
        <Text style={styles.text}>{msg.msg}</Text>
      </TouchableOpacity>
    );
  }

  doToast(msg, duration = 3000) {
    const {addToast, removeToast} = this.props;
    const key = this.nextToastId++;
    addToast(msg, key);
    Timer.setTimeout(() => removeToast(key), duration);
  }
}

const styles = StyleSheet.create({
  container: (windowWidth, windowHeight) => ({
    position: 'absolute',
    top: windowHeight / 3, // padding bottom
    left: windowWidth / 20,
    right: windowWidth / 20, // padding horizontal
    alignItems: 'center',
    zIndex: 9999,
  }),
  textWrap: {
    backgroundColor: 'rgba(60,60,60,0.9)',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 5,
  },
  text: {
    color: '#FFFFFF',
  },
});

const mapStateToProps = state => {
  return {
    toast: state.toast,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToast: (msg, key) => dispatch(toastAction.addToast(msg, key)),
    removeToast: msg => dispatch(toastAction.removeToast(msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyToast);
