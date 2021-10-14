import React, {useState} from 'react';
import {Text, View, Button, ScrollView} from 'react-native';
import {MotionLayerComponentProps} from '@kailash-js/motion-uikit';

export interface FirstScreenProps extends MotionLayerComponentProps {
  text: string;
  onNext: () => void;
}

const FirstScreen: React.FC<FirstScreenProps> = ({
  text,
  onNext,
  componentContext,
}) => {
  const [dText, setDText] = useState('default');
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ScrollView>
        <Text>{text}</Text>
        <Text>kkk</Text>
        <Text>{dText}</Text>
        <Button title="Next" onPress={onNext} />
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
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
        <Text>kkk</Text>
      </ScrollView>
    </View>
  );
};

export {FirstScreen};
