import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {KLButton} from '@kailash-js/react-native-uikit';
import {Hooks} from '@kailash-js/react-native-bases';
export const MiscellaneousScreen = () => {
  //
  const onButtonPressed = () => {
    console.log('onButtonPressed - 5s: ');
  };

  const onButtonPressed1 = () => {
    console.log('onButtonPressed - 2s: ');
  };

  const fireEvent = Hooks.useDelayEventHandler<string>(onButtonPressed, {
    delayUntilRepeat: 5000,
  });

  const fireEvent1 = Hooks.useDelayEventHandler<string>(onButtonPressed1, {
    delayUntilRepeat: 3000,
  });

  const fireEventEx = Hooks.useDelayEventHandlerEx({delayUntilRepeat: 2000});

  const onButtonPressed3 = () => {
    console.log('onButtonPressed3 - 2s: ');
  };

  const onButtonPressed4 = () => {
    console.log('onButtonPressed4 - 5s: ');
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      <KLButton
        title="Delay repeat tap action(5)"
        onPress={() => fireEvent()}
      />
      <KLButton
        title="Delay repeat tap action 1(2s)"
        onPress={() => fireEvent1()}
      />
      <KLButton
        title="Delay repeat tap Ex - 1"
        onPress={() => {
          fireEventEx({
            event: onButtonPressed3,
            eventKey: 'onButtonPressed3',
          });
        }}
      />
      <KLButton
        title="Delay repeat tap Ex - 2"
        onPress={() => {
          fireEventEx({
            event: onButtonPressed4,
            eventKey: 'onButtonPressed4',
            delayUntilRepeat: 5000,
          });
        }}
      />
    </View>
  );
};
