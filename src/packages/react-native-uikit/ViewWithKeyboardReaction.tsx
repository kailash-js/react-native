import React from 'react';
import {Platform} from 'react-native';
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
//@ts-ignore
import {
  useKeyboardEvents,
  KeyboardLayout,
} from '@kailash-js/react-native-keyboard';
import {ViewProps, StyleProp, ViewStyle} from 'react-native';

const defaultSpringConfig = {
  damping: 40,
  mass: 1,
  stiffness: 200,
  overshootClamping: false,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
};

export interface ViewWithKeyboardReactionProps extends ViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  bottomOffet?: number;
  disableReactionOnAndroid?: boolean;
}

export const ViewWithKeyboardReaction: React.FC<ViewWithKeyboardReactionProps> = ({
  style = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  disableReactionOnAndroid = false,
  children = [],
  bottomOffet = 0,
  ...props
}) => {
  const keyboardHeight = useSharedValue(0);

  const animatedLayoutWithKeyboardStyle = useAnimatedStyle(() => {
    return {
      marginBottom: keyboardHeight.value,
    };
  });

  useKeyboardEvents({
    onKeyboardHide: () => {
      keyboardHeight.value = withSpring(0, defaultSpringConfig);
    },
    onKeyboardShow: ({height}: KeyboardLayout) => {
      keyboardHeight.value = withSpring(
        height - bottomOffet,
        defaultSpringConfig,
      );
    },
  });

  return (
    <>
      <Animated.View
        style={[
          style,
          Platform.OS === 'android' && disableReactionOnAndroid
            ? null
            : animatedLayoutWithKeyboardStyle,
        ]}
        {...props}>
        {children}
      </Animated.View>
    </>
  );
};
