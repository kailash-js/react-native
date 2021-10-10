import React, {useEffect} from 'react';
// @ts-ignore
import {RAContentLayoutComponent} from '../types';
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  TapGestureHandler,
  State,
  TapGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
// @ts-ignore
import {useKeyboardEvents, KeyboardLayout} from '@kailash-js/keyboard';

const defaultSpringConfig = {
  damping: 40,
  mass: 1,
  stiffness: 200,
  overshootClamping: false,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
};

export const MotionLayerInputContentLayout: RAContentLayoutComponent = (props) => {
  const keyboardHeight = useSharedValue(0);

  const dimiss = () => {
    props.onDismiss();
  };

  const animatedLayoutWithKeyboardStyle = useAnimatedStyle(() => {
    return {
      marginBottom: keyboardHeight.value,
    };
  });

  const onOverlayTapped = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.END) {
      dimiss();
    }
  };

  useKeyboardEvents({
    onKeyboardHide: () => {
      keyboardHeight.value = withSpring(0, defaultSpringConfig);
    },
    onKeyboardShow: ({height}: KeyboardLayout) => {
      keyboardHeight.value = withSpring(height, defaultSpringConfig);
    },
  });

  return (
    <>
      <Animated.View
        pointerEvents="box-none"
        style={[
          {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'stretch',
          },
          animatedLayoutWithKeyboardStyle,
        ]}>
        <TapGestureHandler onHandlerStateChange={onOverlayTapped}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'transpatent',
              },
            ]}
          />
        </TapGestureHandler>
        {props.children}
      </Animated.View>
    </>
  );
};
