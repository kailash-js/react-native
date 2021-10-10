import Animated, {
  interpolate,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {LayerStackAnimation, LayerStackAnimatedLayout} from './types';

const defaultSpringConfig = {
  damping: 60,
  mass: 1,
  stiffness: 280,
  overshootClamping: false,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
  velocity: 0,
};

export const defaultLayerStackAnimation: LayerStackAnimation = {
  animatedStyles: (
    animatedProgress: Animated.SharedValue<number>,
    animatedLayoutValue: Animated.SharedValue<LayerStackAnimatedLayout>,
  ) => {
    'worklet';
    return {
      transform: [
        {
          translateX: interpolate(
            animatedProgress.value,
            [0, 1],
            [animatedLayoutValue.value.width, 0],
          ),
        },
      ],
    };
  },
  parallaxCoveredAnimatedStyles: (
    animatedProgress: Animated.SharedValue<number>,
  ) => {
    'worklet';
    return {
      opacity: interpolate(animatedProgress.value, [0, 1], [1, 0.5]),
      transform: [
        {
          translateX: interpolate(animatedProgress.value, [0, 1], [0, -50]),
        },
      ],
    };
  },
  presentAnimation: (
    animatedProgress: Animated.SharedValue<number>,
    animationFinished: () => void,
  ) => {
    animatedProgress.value = withSpring(
      1,
      defaultSpringConfig,
      (isFinished) => {
        if (isFinished) {
          runOnJS(animationFinished)();
        }
      },
    );
  },
  dismissAnimation: (
    animatedProgress: Animated.SharedValue<number>,
    animationFinished: () => void,
  ) => {
    animatedProgress.value = withSpring(
      0,
      defaultSpringConfig,
      (isFinished) => {
        if (isFinished) {
          runOnJS(animationFinished)();
        }
      },
    );
  },
  presentParallaxCoveredAnimation: (
    animatedProgress: Animated.SharedValue<number>,
    animationFinished: () => void,
  ) => {
    animatedProgress.value = withSpring(1, defaultSpringConfig, (finished) => {
      if (finished) {
        runOnJS(animationFinished)();
      }
    });
  },
  dismissParallaxCoveredAnimation: (
    animatedProgress: Animated.SharedValue<number>,
    animationFinished: () => void,
  ) => {
    animatedProgress.value = withSpring(0, defaultSpringConfig, (finished) => {
      if (finished) {
        runOnJS(animationFinished)();
      }
    });
  },
};
