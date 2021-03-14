import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';

interface MenuItemProps {
  menuItemId: string;
  title: string;
  description: string;
  imageSource: ImageSourcePropType;
  menuItemSelected: (menuItemId: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  imageSource,
  title,
  description,
  menuItemSelected,
  menuItemId,
}) => {
  const onMenuItemSelected = () => {
    menuItemSelected(menuItemId);
  };

  return (
    <TouchableOpacity
      style={styles.menuItemButton}
      onPress={onMenuItemSelected}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logoImage} source={imageSource} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    paddingLeft: 4,
    marginRight: 8,
  },
  logoContainer: {
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    margin: 12,
  },
  menuItemButton: {
    marginBottom: 8,
  },
  titleText: {
    color: 'black',
    paddingBottom: 2,
  },
  descriptionText: {
    color: 'gray',
  },
});
