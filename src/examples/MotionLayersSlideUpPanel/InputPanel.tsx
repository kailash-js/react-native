import React from 'react';
import {StyleSheet, View, TextInput, Button, Keyboard} from 'react-native';

interface InputPanelProps {
  onCancel: () => void;
}

const InputPanel: React.FC<InputPanelProps> = ({onCancel}) => {
  return (
    <View style={styles.menuContainer}>
      <View
        style={{height: 10, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            height: 4,
            width: 40,
            backgroundColor: 'lightgrey',
            borderRadius: 2,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}>
        <View style={{height: 20}} />
        <View style={{height: 60}}>
          <Button
            title="Dismiss Keyboard"
            onPress={() => {
              Keyboard.dismiss();
            }}
          />
          <Button title="Cancel" onPress={onCancel} />
          <TextInput
            style={{
              height: 40,
              borderWidth: 1,
              borderColor: 'gray',
              marginHorizontal: 20,
            }}
          />
        </View>
        <View style={{height: 100}} />
      </View>
    </View>
  );
};

export default InputPanel;

const styles = StyleSheet.create({
  menuContainer: {},
});
