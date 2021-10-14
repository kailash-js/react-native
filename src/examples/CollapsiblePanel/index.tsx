import React, {useState} from 'react';
import {Text, View, ScrollView, Button} from 'react-native';
import {CollapsiblePanelView} from '@kailash-js/motion-uikit';

export const CollapsibleScreen = () => {
  const [expand, setExpand] = useState(true);
  const [expand1, setExpand1] = useState(true);
  return (
    <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
      <ScrollView>
        <CollapsiblePanelView
          style={{
            marginTop: 60,
            alignItems: 'stretch',
          }}
          header={() => {
            return (
              <View
                style={{
                  backgroundColor: 'yellow',
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <Text>Header</Text>
                <Button
                  title="Hide"
                  onPress={() => {
                    setExpand(true);
                  }}
                />
                <Button
                  title="Show"
                  onPress={() => {
                    setExpand(false);
                  }}
                />
              </View>
            );
          }}
          headerHeight={40}
          isCollapsed={expand}
          headerContainerStyle={{
            backgroundColor: 'green',
          }}
          contentContainerStyle={{}}>
          <View style={{backgroundColor: 'blue', alignItems: 'stretch'}}>
            <Text>Line 1</Text>
            <Text>Line 2</Text>
            <Text>Line 3</Text>
            <View style={{height: 80, backgroundColor: 'green'}} />
          </View>
        </CollapsiblePanelView>
        <CollapsiblePanelView
          style={{
            alignItems: 'stretch',
          }}
          header={() => {
            return (
              <View
                style={{
                  backgroundColor: 'yellow',
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <Text>Header</Text>
                <Button
                  title="Hide"
                  onPress={() => {
                    setExpand1(true);
                  }}
                />
                <Button
                  title="Show"
                  onPress={() => {
                    setExpand1(false);
                  }}
                />
              </View>
            );
          }}
          headerHeight={40}
          isCollapsed={expand1}
          headerContainerStyle={{
            backgroundColor: 'green',
          }}
          contentContainerStyle={{}}>
          <View style={{backgroundColor: 'gray', alignItems: 'stretch'}}>
            <Text>Line 1</Text>
            <Text>Line 2</Text>
            <Text>Line 3</Text>
            <View style={{height: 80, backgroundColor: 'green'}} />
          </View>
        </CollapsiblePanelView>
      </ScrollView>
    </View>
  );
};
