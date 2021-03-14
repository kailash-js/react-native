import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {MotionViews} from '@kailash-js/react-native-uikit';

const TestView = () => {
  useEffect(() => {
    console.log('mounted');
    return () => {
      console.log('un - mounted');
    };
  }, []);

  return (
    <View>
      <Text>fff</Text>
    </View>
  );
};

export const AnimationViewPresenterScreen = () => {
  const [isVisibled, setIsPresenting] = useState<boolean>(false);
  const [isVisibled1, setIsPresenting1] = useState<boolean>(false);

  const onShowHide = () => {
    setIsPresenting(v => !v);
  };

  const onShowHide1 = () => {
    setIsPresenting1(v => !v);
  };

  return (
    <View
      style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
      <View style={{height: 100, backgroundColor: 'red'}}>
        <Button title="Show/Hide" onPress={onShowHide} />
      </View>
      <MotionViews.DisplayIf isDisplaying={isVisibled}>
        <View style={{height: 100, backgroundColor: 'green'}}>
          <TestView />
        </View>
      </MotionViews.DisplayIf>
      <View style={{height: 100, backgroundColor: 'orange'}} />
      <View style={{height: 100, backgroundColor: 'red'}}>
        <Button title="Show/Hide(allocation size)" onPress={onShowHide1} />
      </View>
      <MotionViews.DisplayIf
        isDisplaying={isVisibled1}
        mode="alway-allocate-size">
        <View style={{height: 100, backgroundColor: 'green'}}>
          <TestView />
        </View>
      </MotionViews.DisplayIf>
      <View style={{height: 100, backgroundColor: 'blue'}} />
    </View>
  );
};
