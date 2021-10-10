import {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {AndroidBackButton} from './AndroidBackButton';

export const useAndroidBackEvent = (
  backEvent: () => void,
  options = {blockEvent: true},
) => {
  const onBackPress = () => {
    if (!AndroidBackButton.forceHardwareBackButtonBlocking) {
      if (backEvent) {
        backEvent();
      }
    }
    //
    return options.blockEvent;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);
};
