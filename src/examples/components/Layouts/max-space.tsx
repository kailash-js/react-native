import React, {FC} from 'react';
import {View} from 'react-native';
interface MaxSpaceProps {
  value: number;
}

const MaxSpace: FC<MaxSpaceProps> = () => {
  return <View style={{flex: 1}} />;
};

MaxSpace.defaultProps = {};

export {MaxSpace};
