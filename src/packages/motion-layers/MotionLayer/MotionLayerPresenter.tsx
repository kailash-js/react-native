import React from 'react';
import {
  DEFAULT_MOTION_LAYER_CONTAINER_ID,
  MotionLayerManager,
  MotionLayer,
} from '../MotionLayer';
import {
  ComponentContext,
  MotionLayerHandler,
  MotionLayerConfig,
  MViewAlignment,
} from '../types';
import {ViewStyle} from 'react-native';
import Animated from 'react-native-reanimated';

class MotionLayerPresenter {
  alignmentStyle(viewAlignment: MViewAlignment | undefined): ViewStyle {
    switch (viewAlignment) {
      case 'top':
        return {
          justifyContent: 'flex-start',
          alignItems: 'stretch',
        };
      case 'bottom':
        return {
          justifyContent: 'flex-end',
          alignItems: 'stretch',
        };
    }
    return {
      justifyContent: 'center',
      alignItems: 'stretch',
    };
  }

  animationContainerStyle(
    viewAlignment: MViewAlignment | undefined,
  ): ViewStyle {
    switch (viewAlignment) {
      case 'left':
        return {
          flex: 1,
          flexDirection: 'row',
        };
      case 'right':
        return {
          flex: 1,
          flexDirection: 'row-reverse',
        };
      case 'fill':
        return {
          flex: 1,
        };
      case 'auto':
        return {
          justifyContent: 'center',
          alignItems: 'center',
        };
    }
    return {};
  }

  present<T>(config: MotionLayerConfig<T>) {
    return MotionLayerManager.present(
      (ctx: ComponentContext) => {
        return (
          <MotionLayer
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
            animationContainerStyle={this.animationContainerStyle(
              config.viewAlignment,
            )}
            layoutStyle={{
              flex: 1,
              ...this.alignmentStyle(config.viewAlignment),
            }}
            {...config.motionLayerProps}>
            <config.MotionLayerComponent
              componentContext={ctx}
              {...config.props}
            />
          </MotionLayer>
        );
      },
      {
        containerId:
          config.targetContainerId || DEFAULT_MOTION_LAYER_CONTAINER_ID,
      },
    );
  }
}

const instance = new MotionLayerPresenter();

export {instance as MotionLayerPresenter};
