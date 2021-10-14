import React, {FC} from 'react';
import {StyleSheet, View, Keyboard, ViewProps} from 'react-native';
import {State, TapGestureHandler} from 'react-native-gesture-handler';

interface AutoDimissKeyboardViewProps extends ViewProps {
  children?: React.ReactNode;
  autoDismissKeyboardWhenTapped?: 'none' | 'tapped-began' | 'tapped-active';
}

const AutoDimissKeyboardView: FC<AutoDimissKeyboardViewProps> = (props) => {
  return (
    <View {...props}>
      <TapGestureHandler
        onHandlerStateChange={({nativeEvent}) => {
          if (props.autoDismissKeyboardWhenTapped === 'tapped-began') {
            if (nativeEvent.state === State.BEGAN) {
              Keyboard.dismiss();
            }
          }
          if (props.autoDismissKeyboardWhenTapped === 'tapped-active') {
            if (nativeEvent.state === State.ACTIVE) {
              Keyboard.dismiss();
            }
          }
        }}>
        <View style={StyleSheet.absoluteFillObject} />
      </TapGestureHandler>
      {props.children}
    </View>
  );
};

AutoDimissKeyboardView.defaultProps = {
  autoDismissKeyboardWhenTapped: 'tapped-active',
  children: [],
};

export {AutoDimissKeyboardView};
