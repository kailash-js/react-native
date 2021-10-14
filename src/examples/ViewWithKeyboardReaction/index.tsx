import React from 'react';
import {TextInput} from 'react-native';
import {
  ViewWithKeyboardReaction,
  AutoDimissKeyboardView,
} from '@kailash-js/motion-uikit';
export const ViewWithKeyboardReactionScreen = () => {
  return (
    <ViewWithKeyboardReaction
      style={{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <AutoDimissKeyboardView
        style={{
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'center',
        }}>
        <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            borderColor: 'gray',
            marginHorizontal: 20,
          }}
        />
      </AutoDimissKeyboardView>
    </ViewWithKeyboardReaction>
  );
};
