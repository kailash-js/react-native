import {useEffect} from 'react';
// @ts-ignore
import AndroidKeyboardAdjust from '@react-native-lightkits/android-keyboard-adjust';

export const useAndroidResizeKeyboard = () => {
  useEffect(() => {
    AndroidKeyboardAdjust.setAdjustResize();
    return () => {
      AndroidKeyboardAdjust.setAdjustPan();
    };
  }, []);
};
