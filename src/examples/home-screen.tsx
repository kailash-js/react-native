import React, {FC} from 'react';
import {
  Text,
  View,
  Pressable,
  FlatList,
  GestureResponderEvent,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainStackParamList, MainStackScreens} from './navigator-params';
import {ListItemType} from '@types';
import {ListItemDataSource} from './data-sources';

type HomeScreenNavigationProps = StackNavigationProp<
  MainStackParamList,
  MainStackScreens.home
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProps;
}

export const HomeScreen: FC<HomeScreenProps> = ({navigation}) => {
  const itemPressed = (item: ListItemType) => {
    navigation.navigate(item.routeName);
  };
  return (
    <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
      <View style={{flex: 1}}>
        <FlatList
          data={ListItemDataSource}
          ItemSeparatorComponent={() => (
            <View style={{height: 1, backgroundColor: 'lightgrey'}} />
          )}
          renderItem={({item}) => {
            return (
              <ListItem
                onPressed={() => {
                  itemPressed(item);
                }}
                name={item.name}
                description={item.description}
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

interface ListItemProps {
  onPressed: null | ((event: GestureResponderEvent) => void);
  name: string;
  description: string;
}

const ListItem: FC<ListItemProps> = ({onPressed, name, description}) => {
  return (
    <Pressable
      onPress={onPressed}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
        },
        {
          padding: 10,
        },
      ]}>
      <Text>{name}</Text>
      <Text style={{color: 'grey'}}>{description}</Text>
    </Pressable>
  );
};
