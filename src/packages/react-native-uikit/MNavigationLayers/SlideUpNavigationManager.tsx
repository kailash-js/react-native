import React, {FC} from 'react';
import {SlideLayerProps, SlideLayerPresenter} from '../SlideLayers';
import {utils} from '@kailash-js/react-native-bases';
import {MotionLayerComponentProps} from '@kailash-js/react-native-motion-layers';

export interface RAScreen<T> {
  screenComponent: React.FC<T>;
  props: T;
  style: 'push' | 'modal';
  motionLayerProps?: SlideLayerProps;
  targetContainerId?: string;
}

class SlideUpNavigationManager {
  componentStack = new utils.Stack<string>();
  //
  push<T extends MotionLayerComponentProps>(screenInfo: RAScreen<T>) {
    if (screenInfo.style === 'modal') {
      const componentId = SlideLayerPresenter.present<T>({
        MotionLayerComponent: screenInfo.screenComponent,
        props: screenInfo.props,
        motionLayerProps: screenInfo.motionLayerProps,
        slideFrom: 'bottom',
        targetContainerId: screenInfo.targetContainerId,
      });
      //
      this.componentStack.push(componentId!);
    } else {
      const componentId = SlideLayerPresenter.present<T>({
        MotionLayerComponent: screenInfo.screenComponent,
        props: screenInfo.props,
        motionLayerProps: screenInfo.motionLayerProps,
        slideFrom: 'right',
        targetContainerId: screenInfo.targetContainerId,
      });
      //
      this.componentStack.push(componentId!);
    }
  }

  pop() {
    return this.componentStack.pop();
  }
}

const instance = new SlideUpNavigationManager();

export {instance as SlideUpNavigationManager};
