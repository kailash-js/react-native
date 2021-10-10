import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
//@ts-ignore
import {Handler} from '@kailash-js/foundation';
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {RASubLayerLayerContainerHandler} from '../types';
import {State, TapGestureHandler} from 'react-native-gesture-handler';

export interface MSubLayerContainerProps {
  children?: React.ReactNode;
  handler: RASubLayerLayerContainerHandler;
}

const SubMotionLayerContainer: FC<MSubLayerContainerProps> = ({
  children = [],
  handler,
}) => {
  const coverAnimate = () => {
    console.log('coverAnimate');
  };
  const uncoverAnimate = () => {
    console.log('uncoverAnimate');
  };

  Handler.useExposeHandler(
    handler,
    {
      coverAnimate,
      uncoverAnimate,
    },
    [handler],
  );

  return (
    <Animated.View style={[styles.container]} pointerEvents="box-none">
      {children}
    </Animated.View>
  );
};

export {SubMotionLayerContainer};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
