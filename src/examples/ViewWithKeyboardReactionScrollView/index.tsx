import React, {useEffect, useRef} from 'react';
import {TextInput, ScrollView} from 'react-native';
import {
  ViewWithKeyboardReaction,
  AutoDimissKeyboardView,
} from '@kailash-js/motion-uikit';
import {useAndroidResizeKeyboard} from '@kailash-js/keyboard';

export const ViewWithKeyboardReactionScrollViewScreen = () => {
  useAndroidResizeKeyboard();

  return (
    <ViewWithKeyboardReaction
      disableReactionOnAndroid={true}
      style={{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <ScrollView automaticallyAdjustContentInsets={false}>
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
              marginBottom: 20,
            }}
          />
          <TextInput
            style={{
              height: 40,
              borderWidth: 1,
              borderColor: 'gray',
              marginHorizontal: 20,
              marginBottom: 20,
            }}
          />
          <TextInput
            style={{
              height: 40,
              borderWidth: 1,
              borderColor: 'gray',
              marginHorizontal: 20,
              marginBottom: 20,
            }}
          />
          <TextInput
            style={{
              height: 40,
              borderWidth: 1,
              borderColor: 'gray',
              marginHorizontal: 20,
              marginBottom: 20,
            }}
          />
          <TextInput
            style={{
              height: 40,
              borderWidth: 1,
              borderColor: 'gray',
              marginHorizontal: 20,
              marginBottom: 20,
            }}
          />
          <TextInput
            style={{
              height: 40,
              borderWidth: 1,
              borderColor: 'gray',
              marginHorizontal: 20,
              marginBottom: 20,
            }}
          />
          <TextInput
            style={{
              height: 40,
              borderWidth: 1,
              borderColor: 'gray',
              marginHorizontal: 20,
              marginBottom: 20,
            }}
          />
          <TextInput
            style={{
              height: 40,
              borderWidth: 1,
              borderColor: 'gray',
              marginHorizontal: 20,
              marginBottom: 20,
            }}
          />
          <TextInput
            style={{
              height: 40,
              borderWidth: 1,
              borderColor: 'gray',
              marginHorizontal: 20,
              marginBottom: 20,
            }}
          />
          <TextInput
            style={{
              height: 40,
              borderWidth: 1,
              borderColor: 'red',
              marginHorizontal: 20,
              marginBottom: 20,
            }}
          />
        </AutoDimissKeyboardView>
      </ScrollView>
      <TextInput
        style={{
          height: 40,
          borderWidth: 1,
          borderColor: 'green',
          marginHorizontal: 20,
          marginBottom: 20,
        }}
      />
    </ViewWithKeyboardReaction>
  );
};
