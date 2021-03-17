import React, {FC, useState, useEffect} from 'react';
import {
  LayerStackManager,
  DEFAULT_LAYER_CONTAINER_ID,
} from './layer-stack-manager';
import {LayerStackContainerHandler} from './types';
//@ts-ignore
import {Handler} from '@kailash-js/react-native-bases';
//
import {LayerStack} from './layer-stack';

export interface LayerStackContainerProps {
  containerId?: string;
}

const LayerStackContainer: FC<LayerStackContainerProps> = ({
  containerId = DEFAULT_LAYER_CONTAINER_ID,
}) => {
  const handler = Handler.useHandler<LayerStackContainerHandler>();
  //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rerender, setRerender] = useState<number>(0);
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
  const ChildComponentFuncs = LayerStackManager.getChildComponentFuncs(
    containerId,
  );
  //
  useEffect(() => {
    LayerStackManager.setContainerHandler(handler, containerId);
    return () => {
      LayerStackManager.cleanupContainer(containerId);
    };
  }, []);

  const onLayerStackReady = (viewIndex: number) => {
    if (viewIndex === ChildComponentFuncs.length - 1) {
      LayerStackManager.presentAnimation(containerId);
    }
  };

  if (ChildComponentFuncs.length > 0) {
    return (
      <>
        {ChildComponentFuncs.map((componentFuncItem, index) => {
          return (
            <LayerStack
              context={componentFuncItem.ctx}
              handler={componentFuncItem.ctx.stackLayerHandler!}
              onViewReady={() => {
                onLayerStackReady(index);
              }}
              key={componentFuncItem.componentId}>
              {componentFuncItem.func(componentFuncItem.ctx)}
            </LayerStack>
          );
        })}
      </>
    );
  }
  return <></>;
};

export {LayerStackContainer};
