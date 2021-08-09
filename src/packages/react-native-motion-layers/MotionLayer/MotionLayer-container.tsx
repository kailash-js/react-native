import React, {FC, useState, useEffect} from 'react';
import {
  MotionLayerManager,
  DEFAULT_MOTION_LAYER_CONTAINER_ID,
} from './MotionLayer-manager';
import {SubMotionLayerContainer} from './SubMotionLayer-container';
import {MotionLayerContainerHandler} from '../types';
//@ts-ignore
import {Handler} from '@kailash-js/react-native-bases';
//
export interface MotionLayerContainerProps {
  containerId?: string;
  supportSubLayerContainerAnimation?: boolean;
}

const MotionLayerContainer: FC<MotionLayerContainerProps> = ({
  containerId = DEFAULT_MOTION_LAYER_CONTAINER_ID,
  supportSubLayerContainerAnimation = false,
}) => {
  const handler = Handler.useHandler<MotionLayerContainerHandler>();
  //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rerender, setRerender] = useState<number>(0);
  //
  MotionLayerManager.setContainerHandler(handler, containerId);
  //
  const rerenderIfAny = () => {
    setRerender(value => ++value);
  };

  Handler.useExposeHandler(
    handler,
    {
      rerenderIfAny,
    },
    [handler],
  );
  //
  const ChildComponentFuncs = MotionLayerManager.getChildComponentFuncs(
    containerId,
  );
  //
  useEffect(() => {
    return () => {
      MotionLayerManager.cleanupContainer(containerId);
    };
  }, []);

  if (ChildComponentFuncs.length > 0) {
    if (supportSubLayerContainerAnimation) {
      return (
        <>
          {ChildComponentFuncs.map(componentFuncItem => {
            return (
              <SubMotionLayerContainer
                key={componentFuncItem.componentId}
                handler={componentFuncItem.subLayerContainerHandler}>
                {componentFuncItem.func(componentFuncItem.ctx)}
              </SubMotionLayerContainer>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          {ChildComponentFuncs.map(componentFuncItem => {
            return (
              <React.Fragment key={componentFuncItem.componentId}>
                {componentFuncItem.func(componentFuncItem.ctx)}
              </React.Fragment>
            );
          })}
        </>
      );
    }
  }
  return <></>;
};

export {MotionLayerContainer};
