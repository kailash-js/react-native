import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MenuItemsDataSource} from './MenuConfig';
import MenuItem from './MenuItem';
import {MotionLayerComponentProps} from '@kailash-js/motion-ui';

export interface MenuProps extends MotionLayerComponentProps {
  onSelectMenuItem: (menuItemId: string) => void;
}

export const Menu: React.FC<MenuProps> = ({
  onSelectMenuItem,
  componentContext,
}) => {
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
        {MenuItemsDataSource.map((item, index) => (
          <MenuItem
            key={index}
            menuItemId={item.menuItemId}
            title={item.title}
            description={item.description}
            imageSource={item.icon}
            menuItemSelected={(menuItemId: string) => {
              //componentContext?.motionLayerHandler?.dismiss();
              onSelectMenuItem(menuItemId);
            }}
          />
        ))}
        <View style={{height: 20}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {},
});
