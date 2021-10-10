import React, {useEffect} from 'react';
import {View} from 'react-native';
import {RAContentLayoutComponent} from '../types';

const MotionLayerContentLayout: RAContentLayoutComponent = ({
  children = [],

  style = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}) => {
  return (
    <View style={style} pointerEvents="box-none">
      {children}
    </View>
  );
};

export {MotionLayerContentLayout};
