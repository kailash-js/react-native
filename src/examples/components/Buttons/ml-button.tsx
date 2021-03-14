import React, {FC} from 'react';
import {
  Text,
  Pressable,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
interface MLButtonProps {
  buttonType?: 'solid' | 'outline';
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress?: null | ((event: GestureResponderEvent) => void);
}

const MLButton: FC<MLButtonProps> = ({onPress, style, title}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          height: 42,
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}>
      {({pressed}) => (
        <Text
          style={{
            fontSize: 14,
            color: 'white',
          }}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

MLButton.defaultProps = {
  buttonType: 'solid',
  style: {},
  onPress: null,
};

export {MLButton};
