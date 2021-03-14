import React from 'react';
import {Handler} from '@kailash-js/react-native-bases';
import {
  MotionLayerPresenter,
  MotionLayerHandler,
  MotionLayerComponentProps,
  MotionLayerAnimations,
} from '@kailash-js/react-native-motion-layers';

import {View, ActivityIndicator} from 'react-native';

class LoadingBlockerManager {
  motionLayerHandler = Handler.createStaticHandler<MotionLayerHandler>();
  transparentMLHandler = Handler.createStaticHandler<MotionLayerHandler>();

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
    });
  }

  autoHideLoadingBlocker({duration}: {duration: number}) {
    setTimeout(() => {
      this.hideLoadingBlocker();
    }, duration);
  }

  hideLoadingBlocker() {
    if (this.motionLayerHandler.dismiss) {
      this.motionLayerHandler.dismiss();
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

  hideTransparentLoadingBlocker() {
    if (this.transparentMLHandler.dismiss) {
      this.transparentMLHandler.dismiss();
    }
  }

  autoHideTransparentLoadingBlocker({duration}: {duration: number}) {
    setTimeout(() => {
      this.hideTransparentLoadingBlocker();
    }, duration);
  }
}

const instance = new LoadingBlockerManager();

export {instance as LoadingBlockerManager};
