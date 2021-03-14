import React, {FC} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface BottomSafeSpaceProps {
  value: number;
}

const BottomSafeSpace: FC<BottomSafeSpaceProps> = ({value}) => {
  const insets = useSafeAreaInsets();
  //
  return <View style={{height: insets.bottom > 20 ? 0 : value}} />;
};

BottomSafeSpace.defaultProps = {};

export {BottomSafeSpace};
