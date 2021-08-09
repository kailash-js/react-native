import React from 'react';
import {
  DEFAULT_MOTION_LAYER_CONTAINER_ID,
  MotionLayerManager,
  ComponentContext,
  MotionLayerHandler,
} from '@kailash-js/react-native-motion-layers';
import {PopOverView} from './popover-view';
import Animated from 'react-native-reanimated';
import {MPopoverLayerConfig} from './types';

class MPopoverLayerPresenter {
  present<T>(config: MPopoverLayerConfig<T>) {
    return MotionLayerManager.present(
      (ctx: ComponentContext) => {
        return (
          <PopOverView
            yPosition={config.yPosition}
            arrowPosition={config.arrowPosition}
            direction={config.direction}
            backgroundColor={config.backgroundColor}
            onViewReady={(
              hander: MotionLayerHandler | undefined,
              animatedProgress: Animated.SharedValue<number> | undefined,
              layoutAnimatedProgress?: Animated.SharedValue<number> | undefined,
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
          </PopOverView>
        );
      },
      {containerId: config.targetContainerId || DEFAULT_MOTION_LAYER_CONTAINER_ID},
    );
  }
}

const instance = new MPopoverLayerPresenter();

export {instance as MPopoverLayerPresenter};
