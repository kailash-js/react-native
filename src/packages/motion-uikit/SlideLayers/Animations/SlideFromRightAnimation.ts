import {MotionLayerAnimation} from '@kailash-js/motion-layers';
import {
  runOnJS,
  Easing,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

const defaultSpringConfig = {
  damping: 60,
  mass: 1,
  stiffness: 280,
  overshootClamping: false,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
  velocity: 0,
};

export const slideFromRightAnimation: MotionLayerAnimation = {
  animatedStyles: (animatedProgress, extraInfo) => {
    'worklet';
    const {width, offsetX} = extraInfo.layout.value;
    return {
      opacity: interpolate(animatedProgress.value, [0, 1], [0, 1]),
      transform: [
        {
          translateX: interpolate(
            animatedProgress.value,
            [0, 1],
            [width, offsetX],
          ),
        },
      ],
    };
  },
  presentAnimation: (animatedProgress, animationFinished) => {
    animatedProgress.value = withSpring(1, defaultSpringConfig, isFinished => {
      if (isFinished) {
        runOnJS(animationFinished)();
      }
    });
  },
  dismissAnimation: (animatedProgress, animationFinished) => {
    animatedProgress.value = withTiming(
      0,
      {duration: 250, easing: Easing.ease},
      isFinished => {
        if (isFinished) {
          runOnJS(animationFinished)();
        }
      },
    );
  },
};
