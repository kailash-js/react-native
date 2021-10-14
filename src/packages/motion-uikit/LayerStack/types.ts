import React from 'react';
import {ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';

export interface LayerStackContainerHandler {
  rerenderIfAny: () => void;
}
export interface ComponentContext {
  containerId: string;
  componentId: string;
  animation: boolean;
  animatedProgress?: Animated.SharedValue<number>;
  stackLayerHandler?: LayerStackHandler;
}

export type ComponentFunc = (ctx: ComponentContext) => React.ReactNode;

export interface LayerStackHandler {
  present: (animation: boolean) => void;
  dismiss: (finished?: LayerStackAnimationFinished) => void;
  parallaxCovered: () => void;
  unparallaxCovered: () => void;
}

export type LayerStackAnimationFinished = () => void | undefined;

export interface ComponentFuncItem {
  componentId: string;
  ctx: ComponentContext;
  func: ComponentFunc;
}

export interface LayerStackAnimatedLayout {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface LayerStackComponentProps {
  componentContext?: ComponentContext;
}

export interface LayerStackAnimation {
  animatedStyles: (
    animatedProgress: Animated.SharedValue<number>,
    animatedLayoutValue: Animated.SharedValue<LayerStackAnimatedLayout>,
  ) => ViewStyle;
  parallaxCoveredAnimatedStyles: (
    animatedProgress: Animated.SharedValue<number>,
  ) => ViewStyle;
  presentAnimation: (
    animatedProgress: Animated.SharedValue<number>,
    animationFinished: () => void,
  ) => void;
  dismissAnimation: (
    animatedProgress: Animated.SharedValue<number>,
    animationFinished: () => void,
  ) => void;
  presentParallaxCoveredAnimation: (
    animatedProgress: Animated.SharedValue<number>,
    animationFinished: () => void,
  ) => void;
  dismissParallaxCoveredAnimation: (
    animatedProgress: Animated.SharedValue<number>,
    animationFinished: () => void,
  ) => void;
}
