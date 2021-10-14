import React, {useState, useEffect} from 'react';
import {LayoutChangeEvent, StyleProp, ViewStyle} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withSpring,
  runOnJS,
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

export interface ViewPresenterProps {
  isDisplaying: boolean;
  mode?: 'alway-allocate-size' | 'default';
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  animatedContainerStyle?: StyleProp<ViewStyle>;
}
export const DisplayIf: React.FC<ViewPresenterProps> = ({
  isDisplaying,
  mode = 'default',
  children,
  style,
  animatedContainerStyle,
}) => {
  const [shouldRenderChildren, setShouldRenderChildren] = useState<boolean>(
    isDisplaying,
  );
  //
  const animationProgress = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const isLayoutReady = useSharedValue(false);

  const onContentLayout = (e: LayoutChangeEvent) => {
    const {layout} = e.nativeEvent;
    contentHeight.value = layout.height;
    isLayoutReady.value = true;
    //
    performShowAnimationIfAny();
  };
  const contentAnimatedStyle = useAnimatedStyle(() => {
    if (isLayoutReady.value) {
      if (mode === 'default') {
        return {
          opacity: interpolate(animationProgress.value, [0, 1], [0, 1]),
          transform: [
            {
              translateY: interpolate(
                animationProgress.value,
                [0, 1],
                [-contentHeight.value, 0],
                Extrapolate.CLAMP,
              ),
            },
          ],
        };
      } else {
        return {
          opacity: interpolate(animationProgress.value, [0, 1], [0, 1]),
        };
      }
    } else {
      return {
        transform: [],
      };
    }
  });

  const panelAnimatedStyle = useAnimatedStyle(() => {
    if (isLayoutReady.value) {
      if (mode === 'default') {
        return {
          height: interpolate(
            animationProgress.value,
            [0, 1],
            [0.0001, contentHeight.value],
            Extrapolate.CLAMP,
          ),
        };
      } else {
        return {
          height: contentHeight.value,
        };
      }
    }
    //
    if (mode === 'default') {
      return {height: 0.0001};
    } else {
      return {height: Math.max(0.0001, contentHeight.value)};
    }
  });

  const performShowAnimationIfAny = () => {
    if (isDisplaying) {
      animationProgress.value = withSpring(1, defaultSpringConfig);
    } else {
      performHideAnimation();
    }
  };

  const performHideAnimation = () => {
    animationProgress.value = withSpring(0, defaultSpringConfig, (finished) => {
      if (finished) {
        runOnJS(setShouldRenderChildren)(false);
      }
    });
  };

  const processVisibility = () => {
    if (isDisplaying) {
      setShouldRenderChildren(true);
      performShowAnimationIfAny();
    } else {
      performHideAnimation();
    }
  };

  useEffect(() => {
    processVisibility();
  }, [isDisplaying]);

  return (
    <Animated.View style={[{overflow: 'hidden'}, style, panelAnimatedStyle]}>
      {shouldRenderChildren || mode === 'alway-allocate-size' ? (
        <Animated.View
          style={[animatedContainerStyle, contentAnimatedStyle]}
          onLayout={onContentLayout}>
          {children}
        </Animated.View>
      ) : null}
    </Animated.View>
  );
};
