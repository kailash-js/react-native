import React, {useState} from 'react';
import {Text, View, Button} from 'react-native';
import {
  MotionLayerContainer,
  MotionLayerComponentProps,
} from '@kailash-js/motion-ui';
import {SlideUpNavigationManager} from '@kailash-js/motion-ui';
import {FirstScreen, FirstScreenProps} from './FirstScreen';

export const RANavigationLayersScreen = () => {
  const pushMoreNavigation = () => {
    SlideUpNavigationManager.push<MotionLayerComponentProps>({
      screenComponent: ({componentContext}) => {
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text>Love</Text>
              <Button
                title="Close"
                onPress={() => {
                  componentContext?.motionLayerHandler?.dismiss();
                }}
              />
            </View>
          </View>
        );
      },
      props: {},
      motionLayerProps: {
        canSwipe: false,
      },
      style: 'push',
      targetContainerId: 'navigationLayer',
    });
  };

  const pushNavigation = () => {
    SlideUpNavigationManager.push<FirstScreenProps>({
      screenComponent: FirstScreen,
      props: {
        text: 'xxx',
        onNext: () => {
          pushMoreNavigation();
        },
      },
      motionLayerProps: {
        canSwipe: false,
      },
      style: 'push',
      targetContainerId: 'navigationLayer',
    });
  };

  const showModalIdeal = () => {};

  const showModal = () => {
    SlideUpNavigationManager.push<MotionLayerComponentProps>({
      screenComponent: ({componentContext}) => {
        return (
          <View
            style={{
              height: 400,
              backgroundColor: 'red',
              alignSelf: 'stretch',
              justifyContent: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text>Love</Text>
              <Button
                title="Close"
                onPress={() => {
                  componentContext?.motionLayerHandler?.dismiss();
                }}
              />
              <Button
                title="Next"
                onPress={() => {
                  pushNavigation();
                }}
              />
            </View>
            <MotionLayerContainer containerId="navigationLayer" />
          </View>
        );
      },
      props: {},
      style: 'modal',
      motionLayerProps: {
        contentOffsetY: 100,
        contentOffsetBackground: 'red',
      },
    });
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Show modal navigation" onPress={showModal} />
      <Button title="Show 1" onPress={showModalIdeal} />
    </View>
  );
};
