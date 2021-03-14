import React, {FC} from 'react';
import {View, Text, Button} from 'react-native';

export interface TestContentComponentProps {
  onClose: () => void;
}

const TestContentComponent: FC<TestContentComponentProps> = ({onClose}) => {
  return (
    <View
      style={{
        height: 400,
        backgroundColor: 'yellow',
        alignSelf: 'stretch',
        justifyContent: 'center',
      }}>
      <Text style={{textAlign: 'center'}}>
        Love you more than any words, support fast refresh
      </Text>
      <Button title="Close" onPress={onClose} />
    </View>
  );
};

export {TestContentComponent};
