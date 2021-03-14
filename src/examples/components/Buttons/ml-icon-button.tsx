import React, {FC} from 'react';
import {
  Pressable,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
interface MLIconButtonProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  onPress?: null | ((event: GestureResponderEvent) => void);
}

const MLIconButton: FC<MLIconButtonProps> = ({children, style, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          justifyContent: 'center',
          alignItems: 'center',
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}>
      {children}
    </Pressable>
  );
};

MLIconButton.defaultProps = {
  children: null,
  style: {},
  onPress: null,
};

export {MLIconButton};
