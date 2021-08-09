import {useRef} from 'react';
import {randomString} from './utils';
import {UserActionLock} from './user-action-lock';

export const useUserActionLock = (delay: number = 1000) => {
  //
  const lockKey = useRef<string>(randomString({length: 16}));
  //
  const runAction = (func: Function) => {
    if (
      UserActionLock.lockAutoRelease({
        key: lockKey.current,
        afterDurationMs: delay,
      })
    ) {
      func();
    }
  };

  return runAction;
};
