import React from 'react';
import {Handler} from '@kailash-js/foundation';
import {
  MotionLayerPresenter,
  MotionLayerHandler,
  MotionLayerComponentProps,
  MotionLayerAnimations,
  DEFAULT_MOTION_LAYER_CONTAINER_ID,
} from '@kailash-js/motion-layers';

import {View, ActivityIndicator} from 'react-native';

class LoadingBlockerManager {
  motionLayerHandler = Handler.createStaticHandler<MotionLayerHandler>();
  transparentMLHandler = Handler.createStaticHandler<MotionLayerHandler>();

  hideLoadingBlockerDelay = 250;

  hideTransparentLoadingBlockerDelay = 250;

  motionLayerContainerId = DEFAULT_MOTION_LAYER_CONTAINER_ID;
  //
  //This can be outside of the app for a customization
  loadingBlockerView: React.FC | null = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.7)',
          width: 100,
          height: 100,
          borderRadius: 8,
        }}>
        <ActivityIndicator animating={true} size="large" color="white" />
      </View>
    );
  };

  showLoadingBlocker(blockerView: React.FC | null = null) {
    MotionLayerPresenter.present<MotionLayerComponentProps>({
      MotionLayerComponent: () => {
        if (blockerView) {
          return blockerView({});
        } else {
          if (this.loadingBlockerView) {
            return this.loadingBlockerView({});
          }
        }
        return null;
      },
      props: {},
      motionLayerProps: {
        handler: this.motionLayerHandler,
        overlayTouchDimiss: false,
      },
      viewAlignment: 'auto',
      targetContainerId: this.motionLayerContainerId,
    });
  }

  autoHideLoadingBlocker({duration}: {duration: number}) {
    setTimeout(() => {
      this._hideLoadingBlocker();
    }, duration);
  }

  hideLoadingBlocker(onFinished?: () => void) {
    setTimeout(() => {
      this._hideLoadingBlocker(onFinished);
    }, this.hideLoadingBlockerDelay);
  }

  _hideLoadingBlocker(onFinished?: () => void) {
    if (this.motionLayerHandler.dismiss) {
      this.motionLayerHandler.dismiss(() => {
        this.motionLayerHandler = Handler.createStaticHandler<MotionLayerHandler>();
        onFinished && onFinished();
      });
    }
  }

  showTransparentLoadingBlocker() {
    MotionLayerPresenter.present<MotionLayerComponentProps>({
      MotionLayerComponent: () => {
        return <View />;
      },
      props: {},
      motionLayerProps: {
        animation: MotionLayerAnimations.noneMotionLayerAnimation,
        overlayColor: 'transparent',
        overlayAlpha: 0,
        handler: this.transparentMLHandler,
        overlayTouchDimiss: false,
      },
      viewAlignment: 'auto',
    });
  }

  hideTransparentLoadingBlocker(onFinished?: () => void) {
    setTimeout(() => {
      this._hideTransparentLoadingBlocker(onFinished);
    }, this.hideTransparentLoadingBlockerDelay);
  }

  _hideTransparentLoadingBlocker(onFinished?: () => void) {
    if (this.transparentMLHandler.dismiss) {
      this.transparentMLHandler.dismiss(() => {
        this.transparentMLHandler = Handler.createStaticHandler<MotionLayerHandler>();
        onFinished && onFinished();
      });
    }
  }

  autoHideTransparentLoadingBlocker({duration}: {duration: number}) {
    setTimeout(() => {
      this._hideTransparentLoadingBlocker();
    }, duration);
  }
}

const instance = new LoadingBlockerManager();

export {instance as LoadingBlockerManager};
