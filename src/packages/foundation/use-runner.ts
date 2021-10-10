import {useRef, useEffect} from 'react';
import {UserActionLock} from './user-action-lock';

export interface RunOnceConfig {
  func: () => void;
  lockKey: string;
}
export const useRunner = <T>() => {
  const actionLock = useRef(UserActionLock.create()).current;
  //
  const runOnce = (config: RunOnceConfig) => {
    if (actionLock.lock(config.lockKey)) {
      config.func();
    }
  };

  useEffect(() => {}, []);
  return {runOnce};
};
