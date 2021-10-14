import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {MotionViews} from '@kailash-js/motion-uikit';

interface ComponentAProps {}

const ComponentA: React.FC<ComponentAProps> = () => {
  return (
    <View style={{height: 100, backgroundColor: 'yellow'}}>
      <Text>Component A1</Text>
      <Text>Component A2</Text>
      <Text>Component A3</Text>
    </View>
  );
};

interface ComponentBProps {
  title: string;
}

const ComponentB: React.FC<ComponentBProps> = ({title}) => {
  return (
    <View style={{height: 150, backgroundColor: 'orange'}}>
      <Text>{title}</Text>
      <Text>Component B2</Text>
      <Text>Component B3</Text>
      <Text>Component B4</Text>
    </View>
  );
};

const switchTransitionConfig = {
  components: [
    MotionViews.createSwitchTransitionComponent<ComponentAProps>({
      componentId: 'componentA',
      Component: ComponentA,
      props: {},
    }),
    MotionViews.createSwitchTransitionComponent<ComponentBProps>({
      componentId: 'componentB',
      Component: ComponentB,
      props: {
        title: 'Property name',
      },
    }),
  ],
};

export const TransitionViewPresenterScreen = () => {
  const [activeComponentId, setActiveComponentId] = useState<string>(
    'componentA',
  );

  return (
    <View
      style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
      <View style={{height: 100, backgroundColor: 'red', flexDirection: 'row'}}>
        <Button
          title="Component A"
          onPress={() => {
            setActiveComponentId('componentA');
          }}
        />
        <Button
          title="Component B"
          onPress={() => {
            setActiveComponentId('componentB');
          }}
        />
        <Button
          title="Component X"
          onPress={() => {
            setActiveComponentId('xxx');
          }}
        />
      </View>
      <MotionViews.SwitchTransition
        config={switchTransitionConfig}
        activeComponentId={activeComponentId}
      />
      <View style={{height: 100, backgroundColor: 'blue'}} />
    </View>
  );
};
