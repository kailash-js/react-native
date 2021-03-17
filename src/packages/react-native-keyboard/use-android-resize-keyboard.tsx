import {useEffect} from 'react';
// @ts-ignore
import AndroidKeyboardAdjust from '@kailash-js/android-keyboard-adjust';

export const useAndroidResizeKeyboard = () => {
  useEffect(() => {
    AndroidKeyboardAdjust.setAdjustResize();
    return () => {
      AndroidKeyboardAdjust.setAdjustPan();
    };
  }, []);
};
