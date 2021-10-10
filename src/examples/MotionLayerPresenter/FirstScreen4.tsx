import React, {useState} from 'react';
import {Text, View, Button} from 'react-native';
import {MotionLayerComponentProps} from '@kailash-js/motion-ui';

export interface FirstScreen4Props extends MotionLayerComponentProps {
  text: string;
  onClose: () => void;
}

const FirstScreen4: React.FC<FirstScreen4Props> = ({
  text,
  onClose,
  componentContext,
}) => {
  const [dText, setDText] = useState('default');
  return (
    <View
      style={{
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{text}</Text>
      <Text>kkk</Text>
      <Text>{dText}</Text>
      <Button title="Close" onPress={onClose} />
      <Button
        title="Change state"
        onPress={() => {
          setDText('new text');
        }}
      />
      <Button
        title="Dismiss"
        onPress={() => {
          componentContext?.motionLayerHandler?.dismiss();
        }}
      />
    </View>
  );
};

export {FirstScreen4};
