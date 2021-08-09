import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {State, TapGestureHandler} from 'react-native-gesture-handler';

export interface OverlayViewProps {
  animatedProgress: Animated.SharedValue<number>;
  overlayTapped: () => void;
  hasOverlay: boolean;
  overlayColor: string;
  overlayAlpha: number;
  allowTouchThrough: boolean;
}

const OverlayView: FC<OverlayViewProps> = ({
  animatedProgress,
  overlayTapped,
  hasOverlay = true,
  overlayColor = 'gray',
  overlayAlpha = 0.7,
  allowTouchThrough = false,
}) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedProgress.value,
        [0, 1],
        [0, overlayAlpha],
        Extrapolate.CLAMP,
      ),
    };
  });

  if (!hasOverlay) {
    return null;
  }

  return (
    <TapGestureHandler
      onHandlerStateChange={({nativeEvent}) => {
        if (nativeEvent.state === State.ACTIVE) {
          overlayTapped();
        }
      }}>
      <Animated.View
        style={[
          styles.container,
          animatedStyles,
          {backgroundColor: overlayColor},
        ]}
        pointerEvents={allowTouchThrough ? 'none' : 'auto'}
      />
    </TapGestureHandler>
  );
};

export {OverlayView};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
