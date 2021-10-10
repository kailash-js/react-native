import React, {FC, useState, useEffect, useRef} from 'react';
import {StyleSheet, View, LayoutChangeEvent} from 'react-native';
import {OverlayView} from './OverlayView';
// @ts-ignore
import {Handler} from '@kailash-js/foundation';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  MotionLayerHandler,
  MotionLayerAnimatedLayout,
  RAContentLayoutComponent,
  MotionLayerAnimationFinished,
  MotionLayerProps,
} from '../types';
import {defaultMotionLayerAnimation} from './MotionLayerAnimations';
import {MotionLayerContentLayout} from './MotionLayerContentLayout';

const MotionLayer: FC<MotionLayerProps> = ({
  handler = Handler.createStaticHandler(),
  children = [],
  style = {},
  layoutStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentOffsetX = 0,
  contentOffsetY = 0,
  ContentLayoutComponent = MotionLayerContentLayout,
  canSwipe = true,
  animationContainerStyle = {alignItems: 'stretch'},
  animation = defaultMotionLayerAnimation,
  onViewReady = () => {},
  onDidPresent = () => {},
  onWillPresent = () => {},
  onWillDismiss = () => {},
  onDidDismiss = () => {},
  hasOverlay = true,
  overlayColor = 'grey',
  overlayAlpha = 0.7,
  overlayTouchDimiss = true,
  allowTouchThroughOverlay = false,
  animationMetaData = {},
}) => {
  const [isPresenting, setIsPresenting] = useState(false);
  const presentationStarted = useRef(false);
  const animatedProgress = useSharedValue(0);
  const layoutAnimatedProgress = useSharedValue(0);
  const layoutIsUserInteracting = useSharedValue(false);

  const animatedLayoutValue = useSharedValue<MotionLayerAnimatedLayout>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    offsetX: contentOffsetX,
    offsetY: contentOffsetY,
  });
  //
  const animatedMetaDataValue = useSharedValue<any>(animationMetaData);
  //
  //
  const animatedStyles = useAnimatedStyle(() => {
    return animation.animatedStyles(animatedProgress, {
      layout: animatedLayoutValue,
      metaData: animatedMetaDataValue,
    });
  });

  const _onWillDismiss = () => {
    onWillDismiss();
  };

  const _onDismissed = () => {
    onDidDismiss();
  };

  const _onWillPresent = () => {
    onWillPresent();
  };

  const _onPresented = () => {
    onDidPresent();
  };

  const present = () => {
    _onWillPresent();
    setIsPresenting(true);
  };

  const presentAnimation = () => {
    animation.presentAnimation(animatedProgress, () => {
      _onPresented();
    });
  };

  const dismissAnimation = (finished?: MotionLayerAnimationFinished) => {
    animation.dismissAnimation(animatedProgress, () => {
      setIsPresenting(false);
      //
      if (finished) {
        finished();
      }
      _onDismissed();
    });
  };

  const dismiss = (finished?: MotionLayerAnimationFinished) => {
    _onWillDismiss();
    dismissAnimation(finished);
  };

  const overlayTapped = () => {
    if (overlayTouchDimiss) {
      dismiss();
    }
  };

  Handler.useExposeHandler<MotionLayerHandler>(
    handler,
    {
      present,
      dismiss,
    },
    [handler],
  );

  const onAnimationContainerLayout = (e: LayoutChangeEvent) => {
    if (isPresenting && !presentationStarted.current) {
      presentationStarted.current = true;
      const {layout} = e.nativeEvent;
      animatedLayoutValue.value = {
        ...layout,
        offsetX: contentOffsetX,
        offsetY: contentOffsetY,
      };
      presentAnimation();
    }
  };

  const onLayoutDimiss = () => {
    handler?.dismiss();
  };

  useEffect(() => {
    onViewReady(
      handler,
      animatedProgress,
      layoutAnimatedProgress,
      layoutIsUserInteracting,
    );
  }, []);

  if (isPresenting) {
    let _ContentLayoutComponent = ContentLayoutComponent as RAContentLayoutComponent;
    if (!_ContentLayoutComponent) {
      _ContentLayoutComponent = MotionLayerContentLayout;
    }
    //
    return (
      <View pointerEvents="box-none" style={[styles.container, style]}>
        <OverlayView
          animatedProgress={animatedProgress}
          hasOverlay={hasOverlay}
          overlayColor={overlayColor}
          overlayAlpha={overlayAlpha}
          overlayTapped={overlayTapped}
          allowTouchThrough={allowTouchThroughOverlay}
        />
        <_ContentLayoutComponent
          style={layoutStyle}
          onDismiss={onLayoutDimiss}
          contentOffsetX={contentOffsetX}
          contentOffsetY={contentOffsetY}
          overlayColor={overlayColor}
          overlayAlpha={overlayAlpha}
          hasOverlay={hasOverlay}
          overlayTouchDimiss={overlayTouchDimiss}
          canSwipe={canSwipe}
          motionLayerAnimatedProgress={animatedProgress}
          layoutAnimatedProgress={layoutAnimatedProgress}
          layoutIsUserInteracting={layoutIsUserInteracting}>
          <Animated.View
            pointerEvents="box-none"
            style={[animationContainerStyle, animatedStyles]}
            onLayout={onAnimationContainerLayout}>
            {children}
          </Animated.View>
        </_ContentLayoutComponent>
      </View>
    );
  }
  return null;
};

export {MotionLayer};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
