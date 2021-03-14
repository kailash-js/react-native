import {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {AndroidBackButton} from './AndroidBackButton';

export const useBlockAndroidBackButton = () => {
  const onBackPress = () => {
    return true;
  };

  useEffect(() => {
    AndroidBackButton.forceHardwareBackButtonBlocking = true;
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      AndroidBackButton.forceHardwareBackButtonBlocking = false;
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);
};
