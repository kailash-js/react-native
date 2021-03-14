import React from 'react';
import {View, Button, ScrollView, Text} from 'react-native';
import {
  MotionLayerPresenter,
  MotionLayerAnimations,
  MotionLayerHandler,
  MotionLayerComponentProps,
} from '@kailash-js/react-native-uikit';
import {Handler} from '@kailash-js/react-native-bases';
import {FirstScreen, FirstScreenProps} from './FirstScreen';
import {FirstScreen1, FirstScreen1Props} from './FirstScreen1';
import {FirstScreen2, FirstScreen2Props} from './FirstScreen2';
import {FirstScreen3, FirstScreen3Props} from './FirstScreen3';
import {FirstScreen4, FirstScreen4Props} from './FirstScreen4';

export const MotionLayerPresenterScreen = () => {
  const popupHandler = Handler.useHandler<MotionLayerHandler>();

  const onModalClose = () => {
    console.log('onModalClose', '');
  };

  const presentTop = () => {
    MotionLayerPresenter.present<FirstScreenProps>({
      MotionLayerComponent: FirstScreen,
      props: {
        text: 'Cao Thanh Long',
        onClose: onModalClose,
      },
      viewAlignment: 'top',
    });
  };
  const presentBottom = () => {
    MotionLayerPresenter.present<FirstScreenProps>({
      MotionLayerComponent: FirstScreen,
      props: {
        text: 'Cao Thanh Long',
        onClose: onModalClose,
      },
      viewAlignment: 'bottom',
    });
  };

  const presentLeft = () => {
    MotionLayerPresenter.present<FirstScreen3Props>({
      MotionLayerComponent: FirstScreen3,
      props: {
        text: 'Cao Thanh Long',
        onClose: onModalClose,
      },
      viewAlignment: 'left',
    });
  };
  const presentRight = () => {
    MotionLayerPresenter.present<FirstScreen3Props>({
      MotionLayerComponent: FirstScreen3,
      props: {
        text: 'Cao Thanh Long',
        onClose: onModalClose,
      },
      viewAlignment: 'right',
    });
  };

  const presentFill = () => {
    MotionLayerPresenter.present<FirstScreen1Props>({
      MotionLayerComponent: FirstScreen1,
      props: {
        text: 'Cao Thanh Long',
        onClose: onModalClose,
      },
      viewAlignment: 'fill',
    });
  };

  const presentFillSlideUp = () => {
    MotionLayerPresenter.present<FirstScreen1Props>({
      MotionLayerComponent: FirstScreen1,
      props: {
        text: 'Cao Thanh Long',
        onClose: onModalClose,
      },
      motionLayerProps: {
        animation: MotionLayerAnimations.slideUpAnimation,
      },
      viewAlignment: 'fill',
    });
  };

  const presentAuto = () => {
    MotionLayerPresenter.present<FirstScreen2Props>({
      MotionLayerComponent: FirstScreen2,
      props: {
        text: 'Cao Thanh Long',
        onClose: onModalClose,
      },
      viewAlignment: 'auto',
    });
  };

  const presentAutoDefault = () => {
    MotionLayerPresenter.present<FirstScreen2Props>({
      MotionLayerComponent: FirstScreen2,
      props: {
        text: 'Cao Thanh Long',
        onClose: onModalClose,
      },
      motionLayerProps: {
        animation: MotionLayerAnimations.fadeMotionLayerAnimation,
      },
    });
  };

  const presentAutoAutoSize = () => {
    MotionLayerPresenter.present<FirstScreen4Props>({
      MotionLayerComponent: FirstScreen4,
      props: {
        text: 'Cao Thanh Long',
        onClose: onModalClose,
      },
      motionLayerProps: {
        overlayTouchDimiss: false,
        handler: popupHandler,
      },
      viewAlignment: 'auto',
    });
    setTimeout(() => {
      popupHandler.dismiss();
    }, 2000);
  };

  const presentAutoAutoSizeFuncP = () => {
    MotionLayerPresenter.present<MotionLayerComponentProps>({
      MotionLayerComponent: ({componentContext}) => {
        return (
          <View
            style={{
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>This is a direct custom function components</Text>
            <Text>Loading...</Text>
            <Button
              title="Dismiss"
              onPress={() => {
                componentContext?.motionLayerHandler?.dismiss();
              }}
            />
          </View>
        );
      },
      props: {},
      viewAlignment: 'auto',
    });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ScrollView>
        <Button title="MotionLayerPresenter - Top" onPress={presentTop} />
        <Button title="MotionLayerPresenter - Bottom" onPress={presentBottom} />
        <Button title="MotionLayerPresenter - Left" onPress={presentLeft} />
        <Button title="MotionLayerPresenter - Right" onPress={presentRight} />
        <Button title="MotionLayerPresenter - Fill" onPress={presentFill} />
        <Button
          title="MotionLayerPresenter - filled (slide up)"
          onPress={presentFillSlideUp}
        />
        <Button title="MotionLayerPresenter - Auto" onPress={presentAuto} />
        <Button
          title="MotionLayerPresenter - Auto (Default)"
          onPress={presentAutoDefault}
        />
        <Button
          title="MotionLayerPresenter - Auto (auto size based on content) + external handler"
          onPress={presentAutoAutoSize}
        />
        <Button
          title="MotionLayerPresenter - Auto (auto size based on content) + custom func comp"
          onPress={presentAutoAutoSizeFuncP}
        />
      </ScrollView>
    </View>
  );
};
