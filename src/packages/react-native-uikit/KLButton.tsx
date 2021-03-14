import React, {FC} from 'react';
import {
  Text,
  Pressable,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface KLButtonProps {
  buttonType?: 'solid' | 'outline';
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress?: null | ((event: GestureResponderEvent) => void);
}

const KLButton: FC<KLButtonProps> = ({onPress, style, title}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'red' : 'green',
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}>
      {({pressed}) => <Text style={{marginVertical: 10}}>{title}</Text>}
    </Pressable>
  );
};

KLButton.defaultProps = {
  buttonType: 'solid',
  style: {},
  onPress: null,
};

export {KLButton};
