import React from 'react';
import {ViewStyle, ViewProps, StyleProp} from 'react-native';
import Animated from 'react-native-reanimated';

export type OnViewReadyEvent = (
  hander?: MotionLayerHandler,
  animatedProgress?: Animated.SharedValue<number>,
  layoutAnimatedProgress?: Animated.SharedValue<number>,
  layoutIsUserInteracting?: Animated.SharedValue<boolean>,
) => void;

export interface MotionLayerProps {
  handler?: MotionLayerHandler;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  layoutStyle?: StyleProp<ViewStyle>;
  ContentLayoutComponent?: RAContentLayoutComponent;
  canSwipe?: boolean;
  animationContainerStyle?: StyleProp<ViewStyle>;
  animation?: MotionLayerAnimation;
  hasOverlay?: boolean;
  overlayColor?: string;
  overlayAlpha?: number;
  overlayTouchDimiss?: boolean;
  allowTouchThroughOverlay?: boolean;
  contentOffsetX?: number;
  contentOffsetY?: number;
  onViewReady?: OnViewReadyEvent;
  onDidPresent?: () => void;
  onWillPresent?: () => void;
  onWillDismiss?: () => void;
  onDidDismiss?: () => void;
  animationMetaData?: object;
}

export interface MotionLayerAnimatedLayout {
  width: number;
  height: number;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
}

type SharedValue = number | string | boolean | object;
//T is meta data type, it can be default to {}
export interface MotionLayerAnimation<T extends SharedValue = any> {
  animatedStyles: (
    animatedProgress: Animated.SharedValue<number>,
    extraInfo: {
      layout: Animated.SharedValue<MotionLayerAnimatedLayout>;
      metaData: Animated.SharedValue<T>;
    },
  ) => ViewStyle;
  presentAnimation: (
    animatedProgress: Animated.SharedValue<number>,
    animationFinished: () => void,
  ) => void;
  dismissAnimation: (
    animatedProgress: Animated.SharedValue<number>,
    animationFinished: () => void,
  ) => void;
}

export type MotionLayerAnimationFinished = () => void | undefined;

export interface MotionLayerHandler {
  present: () => void;
  dismiss: (finished?: MotionLayerAnimationFinished) => void;
}

export interface RASubLayerLayerContainerHandler {
  coverAnimate: () => void;
  uncoverAnimate: () => void;
}

export interface MotionLayerContainerHandler {
  rerenderIfAny: () => void;
}

export interface ComponentContext {
  containerId: string;
  componentId: string;
  animatedProgress?: Animated.SharedValue<number>;
  motionLayerHandler?: MotionLayerHandler | undefined;
  layoutAnimatedProgress?: Animated.SharedValue<number>;
  layoutIsUserInteracting?: Animated.SharedValue<boolean>;
}

export type ComponentFunc = (ctx: ComponentContext) => React.ReactNode;

export interface ComponentFuncItem {
  componentId: string;
  subLayerContainerHandler: RASubLayerLayerContainerHandler;
  ctx: ComponentContext;
  func: ComponentFunc;
}

export interface RAContentLayoutProps extends ViewProps {
  children: React.ReactNode;
  onDismiss: () => void;
  motionLayerAnimatedProgress: Animated.SharedValue<number>;
  layoutAnimatedProgress: Animated.SharedValue<number>;
  layoutIsUserInteracting: Animated.SharedValue<boolean>;
  //
  contentOffsetX: number;
  contentOffsetY: number;
  canSwipe: boolean;
  hasOverlay: boolean;
  overlayColor: string;
  overlayAlpha: number;
  overlayTouchDimiss: boolean;
}

export type RAContentLayoutComponent = React.FC<RAContentLayoutProps>;

export interface MotionLayerComponentProps {
  componentContext?: ComponentContext;
}

export type MViewAlignment =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'fill'
  | 'auto';

export interface MotionLayerConfig<T extends MotionLayerComponentProps> {
  MotionLayerComponent: React.FC<T>;
  props: T;
  motionLayerProps?: MotionLayerProps;
  viewAlignment?: MViewAlignment | undefined;
  targetContainerId?: string;
}
