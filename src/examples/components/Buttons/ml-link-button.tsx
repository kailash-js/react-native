import React, {FC} from 'react';
import {
  Text,
  Pressable,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
interface MLLinkButtonProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress?: null | ((event: GestureResponderEvent) => void);
}

const MLLinkButton: FC<MLLinkButtonProps> = ({onPress, style, title}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}>
      {({pressed}) => (
        <Text
          style={{
            fontSize: 12,
            color: '#636466',
          }}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

MLLinkButton.defaultProps = {
  style: {},
  onPress: null,
};

export {MLLinkButton};
