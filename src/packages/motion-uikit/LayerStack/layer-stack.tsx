import React, {useEffect, useState} from 'react';
import {LayoutChangeEvent, useWindowDimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated';
import {
  LayerStackHandler,
  LayerStackAnimationFinished,
  LayerStackAnimatedLayout,
  ComponentContext,
  LayerStackAnimation,
} from './types';
import {Handler} from '@kailash-js/foundation';
import {defaultLayerStackAnimation} from './layer-stack-animations';

export interface LayerStackProps {
  handler: LayerStackHandler;
  children?: React.ReactNode;
  context: ComponentContext;
  animation?: LayerStackAnimation;
  onViewReady: () => void;
}

export const LayerStack: React.FC<LayerStackProps> = ({
  handler,
  children,
  context,
  animation = defaultLayerStackAnimation,
  onViewReady,
}) => {
  const Dimensions = useWindowDimensions();
  const [isPresenting, setIsPresenting] = useState(false);
  const animatedProgress = useSharedValue(0);
  const needAnimation = useSharedValue<boolean>(true);
  const animatedProgressAfterPresented = useSharedValue(0);
  const presented = useSharedValue<boolean>(false);
  const willDismiss = useSharedValue<boolean>(false);

  const animatedLayoutValue = useSharedValue<LayerStackAnimatedLayout>({
    width: Dimensions.width,
    height: 0,
    x: 0,
    y: 0,
  });

  const animatedStyles = useAnimatedStyle(() => {
    if (!presented.value || willDismiss.value) {
      return animation.animatedStyles(animatedProgress, animatedLayoutValue);
    } else {
      return animation.parallaxCoveredAnimatedStyles(
        animatedProgressAfterPresented,
      );
    }
  });

  const presentNoAnimation = (animationFinished: () => void) => {
    animatedProgress.value = 1;
    runOnJS(animationFinished)();
  };

  const presentAnimation = (animationFinished: () => void) => {
    animation.presentAnimation(animatedProgress, animationFinished);
  };

  const dismissAnimation = (animationFinished: () => void) => {
    willDismiss.value = true;
    animation.dismissAnimation(animatedProgress, animationFinished);
  };

  const present = (animated: boolean = true) => {
    needAnimation.value = animated;
    setIsPresenting(true);
  };

  const dismiss = (finished?: LayerStackAnimationFinished) => {
    dismissAnimation(() => {
      finished && finished();
    });
  };

  const parallaxCovered = () => {
    cancelAnimation(animatedProgressAfterPresented);
    //
    animation.presentParallaxCoveredAnimation(
      animatedProgressAfterPresented,
      () => {},
    );
  };

  const unparallaxCovered = () => {
    cancelAnimation(animatedProgressAfterPresented);
    //
    animation.dismissParallaxCoveredAnimation(
      animatedProgressAfterPresented,
      () => {},
    );
  };

  const onAnimationContainerLayout = (e: LayoutChangeEvent) => {
    if (isPresenting) {
      const {layout} = e.nativeEvent;
      animatedLayoutValue.value = {
        ...layout,
      };
      if (needAnimation.value) {
        presentAnimation(() => {
          presented.value = true;
        });
      } else {
        presentNoAnimation(() => {
          presented.value = true;
        });
      }
    }
  };

  Handler.useExposeHandler<LayerStackHandler>(
    handler,
    {
      present,
      dismiss,
      parallaxCovered,
      unparallaxCovered,
    },
    [handler],
  );

  useEffect(() => {
    context.animatedProgress = animatedProgress;
    onViewReady();
  }, []);

  if (isPresenting) {
    return (
      <Animated.View
        onLayout={onAnimationContainerLayout}
        style={[
          {
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          },
          animatedStyles,
        ]}>
        {children}
      </Animated.View>
    );
  }
  return null;
};
