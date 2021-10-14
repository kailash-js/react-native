import React, {useState} from 'react';
import {Text, View, Button} from 'react-native';
import {MotionLayerComponentProps} from '@kailash-js/motion-uikit';

export interface FirstScreen3Props extends MotionLayerComponentProps {
  text: string;
  onClose: () => void;
}

const FirstScreen3: React.FC<FirstScreen3Props> = ({
  text,
  onClose,
  componentContext,
}) => {
  const [dText, setDText] = useState('default');
  return (
    <View
      style={{
        width: 200,
        alignSelf: 'stretch',
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

export {FirstScreen3};
