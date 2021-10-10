import React from 'react';
import {View} from 'react-native';
import {MotionLayer} from '@kailash-js/motion-layers';
import {SlideLayerProps} from './types';
// @ts-ignore
import {Handler} from '@kailash-js/foundation';
import {SlideAnimations} from './Animations';

import {SlideLayerContentLayout} from './Layouts';

export const SlideUpInputLayer: React.FC<SlideLayerProps> = ({
  handler = Handler.createStaticHandler(),
  contentOffsetY = 0,
  contentOffsetBackground = 'white',
  children = [],
  ...props
}) => {
  return (
    <MotionLayer
      handler={handler}
      animation={SlideAnimations.slideUpAnimation}
      ContentLayoutComponent={SlideLayerContentLayout.SlideUpInputContentLayout}
      hasOverlay={false}
      contentOffsetY={contentOffsetY}
      {...props}>
      {children}
      <View
        style={{
          alignSelf: 'stretch',
          height: contentOffsetY,
          backgroundColor: contentOffsetBackground,
        }}
      />
    </MotionLayer>
  );
};

export const SlideUpLayer: React.FC<SlideLayerProps> = ({
  handler = Handler.createStaticHandler(),
  contentOffsetY = 0,
  contentOffsetBackground = 'white',
  children = [],
  ...props
}) => {
  return (
    <MotionLayer
      handler={handler}
      animation={SlideAnimations.slideUpAnimation}
      ContentLayoutComponent={SlideLayerContentLayout.SlideUpContentLayout}
      hasOverlay={false}
      contentOffsetY={contentOffsetY}
      {...props}>
      {children}
      <View
        style={{
          alignSelf: 'stretch',
          height: contentOffsetY,
          backgroundColor: contentOffsetBackground,
        }}
      />
    </MotionLayer>
  );
};

export const SlideDownLayer: React.FC<SlideLayerProps> = ({
  handler = Handler.createStaticHandler(),
  contentOffsetY = 0,
  contentOffsetBackground = 'white',
  children = [],
  ...props
}) => {
  return (
    <MotionLayer
      handler={handler}
      animation={SlideAnimations.slideDownAnimation}
      ContentLayoutComponent={SlideLayerContentLayout.SlideDownContentLayout}
      hasOverlay={false}
      contentOffsetY={contentOffsetY}
      {...props}>
      <View
        style={{
          alignSelf: 'stretch',
          height: contentOffsetY,
          backgroundColor: contentOffsetBackground,
        }}
      />
      {children}
    </MotionLayer>
  );
};

export const SlideFromLeftLayer: React.FC<SlideLayerProps> = ({
  handler = Handler.createStaticHandler(),
  contentOffsetX = 0,
  contentOffsetBackground = 'white',
  children = [],
  ...props
}) => {
  return (
    <MotionLayer
      handler={handler}
      animation={SlideAnimations.slideFromLeftAnimation}
      ContentLayoutComponent={
        SlideLayerContentLayout.SlideFromLeftContentLayout
      }
      animationContainerStyle={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
      }}
      hasOverlay={false}
      contentOffsetX={contentOffsetX}
      {...props}>
      <View
        style={{
          width: contentOffsetX,
          backgroundColor: contentOffsetBackground,
        }}
      />
      {children}
    </MotionLayer>
  );
};

export const SlideFromRightLayer: React.FC<SlideLayerProps> = ({
  handler = Handler.createStaticHandler(),
  contentOffsetX = 0,
  contentOffsetBackground = 'white',
  children = [],
  ...props
}) => {
  return (
    <MotionLayer
      handler={handler}
      animation={SlideAnimations.slideFromRightAnimation}
      ContentLayoutComponent={
        SlideLayerContentLayout.SlideFromRightContentLayout
      }
      animationContainerStyle={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
      }}
      hasOverlay={false}
      contentOffsetX={contentOffsetX}
      {...props}>
      {children}
      <View
        style={{
          width: contentOffsetX,
          backgroundColor: contentOffsetBackground,
        }}
      />
    </MotionLayer>
  );
};
