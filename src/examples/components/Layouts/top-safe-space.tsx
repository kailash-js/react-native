import React, {FC} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface TopSafeSpaceProps {
  value: number;
}

const TopSafeSpace: FC<TopSafeSpaceProps> = ({value}) => {
  const insets = useSafeAreaInsets();
  //
  return <View style={{height: insets.top > 20 ? 0 : value}} />;
};

TopSafeSpace.defaultProps = {};

export {TopSafeSpace};
