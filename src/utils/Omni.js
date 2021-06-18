/**
 * Created by KhanhNQ on 17/02/2017.
 *
 * @format
 */
import { Alert } from 'react-native';
import _moment from 'moment';
import 'moment/locale/vi';
import { DeviceEventEmitter } from 'react-native';
//import _EventEmitter from 'EventEmitter';
import _Timer from 'react-timer-mixin';
import _Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _IconIO from 'react-native-vector-icons/Ionicons';
import _IconMI from 'react-native-vector-icons/MaterialIcons';

import _Device from './Device';
import _Constants from './Constants';
import _Languages from './Languages';
import _Images from './Images';
import { log as _log, warn as _warn, error as _error } from './log';

_moment.locale('vi');

export const moment = _moment;
//export const EventEmitter = new _EventEmitter();
export const EventEmitter = DeviceEventEmitter;
export const Timer = _Timer;

export const Icon = _Icon;
export const IconIO = _IconIO;
export const IconMI = _IconMI;
export const Languages = _Languages;
export const Images = _Images;
export const Constants = _Constants;
export const Device = _Device;
export const log = _log;
export const warn = _warn;
export const error = _error;

/**
 * Display the message toast-like (work both with Android and iOS)
 * @param msg Message to display
 * @param duration Display duration
 */
const _toast = (msg, duration = 3000) =>
  EventEmitter.emit(_Constants.EmitCode.Toast, msg, duration);

export const toast = _toast;

const _showAlert = (title, message, onOK, onCancel) => {
  Alert.alert(title, message, [
    {
      text: Languages.Cancel,
      onPress: onCancel || undefined,
    },
    { text: Languages.OK, onPress: onOK },
  ]);
};

export const showAlert = _showAlert;
