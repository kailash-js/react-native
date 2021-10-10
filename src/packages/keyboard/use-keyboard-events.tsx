import {useEffect, useRef} from 'react';
import {Keyboard, Platform, KeyboardEvent, ScreenRect} from 'react-native';

export type KeyboardLayout = {
  height: number;
};

export interface KeyboardEventHandlers {
  onKeyboardHide: () => void;
  onKeyboardShow: (keyboardLayout: KeyboardLayout) => void;
}

export const useKeyboardEvents = (handler: KeyboardEventHandlers) => {
  const isShowingKeyboard = useRef(false);
  //
  useEffect(() => {
    const keyboardWillShowSub = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      onKeyboardWillShow,
    );
    const keyboardWillHideSub = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      onKeyboardWillHide,
    );
    //
    return () => {
      keyboardWillShowSub.remove();
      keyboardWillHideSub.remove();
    };
  }, []);

  const _relativeKeyboardHeight = (keyboardFrame: ScreenRect) => {
    if (!keyboardFrame) {
      return 0;
    }
    //
    const keyboardSpace = keyboardFrame.height;
    return keyboardSpace;
  };

  const onKeyboardWillShow = (event: KeyboardEvent) => {
    if (Platform.OS === 'android') {
      showKeyboard(event);
    } else {
      if (event.duration > 0) {
        showKeyboard(event);
      }
    }
  };

  const onKeyboardWillHide = (event: KeyboardEvent) => {
    if (Platform.OS === 'android') {
      hideKeyboard(event);
    } else {
      if (event.duration > 0) {
        hideKeyboard(event);
      }
    }
  };

  const hideKeyboard = (_: KeyboardEvent) => {
    if (isShowingKeyboard.current === true) {
      isShowingKeyboard.current = false;
      handler.onKeyboardHide();
    }
  };

  const showKeyboard = (event: KeyboardEvent) => {
    if (isShowingKeyboard.current === false) {
      isShowingKeyboard.current = true;
      const kHeight = _relativeKeyboardHeight(event.endCoordinates);
      handler.onKeyboardShow({height: kHeight});
    }
  };
};
