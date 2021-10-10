import React, {useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import {LayerStack} from '@kailash-js/motion-ui';
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface TestViewProps extends LayerStack.LayerStackComponentProps {}

const TestView: React.FC<TestViewProps> = ({componentContext}) => {
  const animatedProgress = componentContext?.animatedProgress!;

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedProgress.value, [0, 1], [0, 1]),
      transform: [
        {
          translateY: interpolate(
            animatedProgress.value,
            [0, 1],
            [0, 100],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'red',
        justifyContent: 'flex-start',
      }}>
      <Text>This is the header text</Text>
      <Animated.View
        style={[
          {width: 200, height: 200, backgroundColor: 'green'},
          animatedStyles,
        ]}
      />
    </View>
  );
};

interface TestView1Props extends LayerStack.LayerStackComponentProps {}

const TestView1: React.FC<TestView1Props> = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'yellow',
        justifyContent: 'flex-start',
      }}>
      <Text>This is the header text</Text>
    </View>
  );
};

interface TestView0Props extends LayerStack.LayerStackComponentProps {}

const TestView0: React.FC<TestView0Props> = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'orange',
        justifyContent: 'flex-start',
      }}>
      <Text>This is the first header text</Text>
    </View>
  );
};

export const StackLayersScreen = () => {
  const onAction = () => {
    LayerStack.LayerStackManager.push(ctx => {
      return <TestView componentContext={ctx} />;
    });
  };
  const onAction1 = () => {
    LayerStack.LayerStackManager.push(ctx => {
      return <TestView1 componentContext={ctx} />;
    });
  };

  const onUnstack = () => {
    LayerStack.LayerStackManager.pop();
  };

  useEffect(() => {
    LayerStack.LayerStackManager.push(ctx => {
      ctx.animation = false;
      return <TestView0 componentContext={ctx} />;
    });
  }, []);
  return (
    <View
      style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
      <View style={{flexDirection: 'row'}}>
        <Button title="Action" onPress={onAction} />
        <Button title="Action1" onPress={onAction1} />
        <Button title="unstack" onPress={onUnstack} />
      </View>
      <View style={{flex: 1}}>
        <LayerStack.LayerStackContainer />
      </View>
    </View>
  );
};
