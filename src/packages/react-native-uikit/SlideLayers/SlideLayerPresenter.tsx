import React from 'react';
import {Keyboard} from 'react-native';
import {
  MotionLayerManager,
  ComponentContext,
  MotionLayerHandler,
} from '@kailash-js/react-native-motion-layers';
import {SlideLayerConfig} from './types';
import * as SlideLayers from './SlideLayers';
import Animated from 'react-native-reanimated';

class SlideLayerPresenter {
  present<T>(config: SlideLayerConfig<T>) {
    const autoDismissKeyboard = config.autoDismissKeyboard || true;
    //
    if (autoDismissKeyboard) {
      Keyboard.dismiss();
    }
    //
    switch (config.slideFrom) {
      case 'top':
        return MotionLayerManager.present(
          (ctx: ComponentContext) => {
            return (
              <SlideLayers.SlideDownLayer
                animationContainerStyle={{
                  alignItems: 'stretch',
                }}
                onViewReady={(
                  hander: MotionLayerHandler | undefined,
                  animatedProgress: Animated.SharedValue<number> | undefined,
                  layoutAnimatedProgress?:
                    | Animated.SharedValue<number>
                    | undefined,
                  layoutIsUserInteracting?:
                    | Animated.SharedValue<boolean>
                    | undefined,
                ) => {
                  ctx.motionLayerHandler = hander;
                  ctx.animatedProgress = animatedProgress;
                  ctx.layoutIsUserInteracting = layoutIsUserInteracting;
                  ctx.layoutAnimatedProgress = layoutAnimatedProgress;
                  hander?.present();
                }}
                onDidDismiss={() => {
                  MotionLayerManager.dismiss(ctx);
                }}
                {...config.motionLayerProps}>
                <config.MotionLayerComponent
                  componentContext={ctx}
                  {...config.props}
                />
              </SlideLayers.SlideDownLayer>
            );
          },
          {containerId: config.targetContainerId},
        );

      case 'bottom':
        return MotionLayerManager.present(
          (ctx: ComponentContext) => {
            return (
              <SlideLayers.SlideUpLayer
                animationContainerStyle={{
                  alignItems: 'stretch',
                }}
                onViewReady={(
                  hander: MotionLayerHandler | undefined,
                  animatedProgress: Animated.SharedValue<number> | undefined,
                  layoutAnimatedProgress?:
                    | Animated.SharedValue<number>
                    | undefined,
                  layoutIsUserInteracting?:
                    | Animated.SharedValue<boolean>
                    | undefined,
                ) => {
                  ctx.motionLayerHandler = hander;
                  ctx.animatedProgress = animatedProgress;
                  ctx.layoutIsUserInteracting = layoutIsUserInteracting;
                  ctx.layoutAnimatedProgress = layoutAnimatedProgress;
                  hander?.present();
                }}
                onDidDismiss={() => {
                  MotionLayerManager.dismiss(ctx);
                }}
                {...config.motionLayerProps}>
                <config.MotionLayerComponent
                  componentContext={ctx}
                  {...config.props}
                />
              </SlideLayers.SlideUpLayer>
            );
          },
          {containerId: config.targetContainerId},
        );

      case 'left':
        return MotionLayerManager.present(
          (ctx: ComponentContext) => {
            return (
              <SlideLayers.SlideFromLeftLayer
                onViewReady={(
                  hander: MotionLayerHandler | undefined,
                  animatedProgress: Animated.SharedValue<number> | undefined,
                  layoutAnimatedProgress?:
                    | Animated.SharedValue<number>
                    | undefined,
                  layoutIsUserInteracting?:
                    | Animated.SharedValue<boolean>
                    | undefined,
                ) => {
                  ctx.motionLayerHandler = hander;
                  ctx.animatedProgress = animatedProgress;
                  ctx.layoutIsUserInteracting = layoutIsUserInteracting;
                  ctx.layoutAnimatedProgress = layoutAnimatedProgress;
                  hander?.present();
                }}
                onDidDismiss={() => {
                  MotionLayerManager.dismiss(ctx);
                }}
                {...config.motionLayerProps}>
                <config.MotionLayerComponent
                  componentContext={ctx}
                  {...config.props}
                />
              </SlideLayers.SlideFromLeftLayer>
            );
          },
          {containerId: config.targetContainerId},
        );

      case 'right':
        return MotionLayerManager.present(
          (ctx: ComponentContext) => {
            return (
              <SlideLayers.SlideFromRightLayer
                onViewReady={(
                  hander: MotionLayerHandler | undefined,
                  animatedProgress: Animated.SharedValue<number> | undefined,
                  layoutAnimatedProgress?:
                    | Animated.SharedValue<number>
                    | undefined,
                  layoutIsUserInteracting?:
                    | Animated.SharedValue<boolean>
                    | undefined,
                ) => {
                  ctx.motionLayerHandler = hander;
                  ctx.animatedProgress = animatedProgress;
                  ctx.layoutIsUserInteracting = layoutIsUserInteracting;
                  ctx.layoutAnimatedProgress = layoutAnimatedProgress;
                  hander?.present();
                }}
                onDidDismiss={() => {
                  MotionLayerManager.dismiss(ctx);
                }}
                {...config.motionLayerProps}>
                <config.MotionLayerComponent
                  componentContext={ctx}
                  {...config.props}
                />
              </SlideLayers.SlideFromRightLayer>
            );
          },
          {containerId: config.targetContainerId},
        );
    }
  }
}

const instance = new SlideLayerPresenter();

export {instance as SlideLayerPresenter};
