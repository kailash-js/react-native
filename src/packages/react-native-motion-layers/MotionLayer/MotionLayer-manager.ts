import {
  MotionLayerContainerHandler,
  ComponentFunc,
  ComponentFuncItem,
  ComponentContext,
  RASubLayerLayerContainerHandler,
} from '../types';
// @ts-ignore
import {utils, Handler} from '@kailash-js/react-native-bases';
import {MotionLayerComponentStorage} from './MotionLayerComponentStorage';

export const DEFAULT_RALAYER_CONTAINER_ID = 'default';
export const DEFAULT_COMPONENT_ID = 'defaultCID';

class MotionLayerManager {
  motionLayerContainerHandlers: Map<
    string,
    MotionLayerContainerHandler
  > = new Map<string, MotionLayerContainerHandler>();

  ChildComponentFuncs: Map<string, ComponentFuncItem[]> = new Map<
    string,
    ComponentFuncItem[]
  >();

  getChildComponentFuncs(
    containerId: string = DEFAULT_RALAYER_CONTAINER_ID,
  ): ComponentFuncItem[] {
    if (this.ChildComponentFuncs.has(containerId)) {
      return this.ChildComponentFuncs.get(containerId) || [];
    }
    this.ChildComponentFuncs.set(containerId, []);
    return [];
  }

  getTopLayerHandler(containerId: string = DEFAULT_RALAYER_CONTAINER_ID) {
    if (this.motionLayerContainerHandlers.has(containerId)) {
      return this.motionLayerContainerHandlers.get(containerId);
    }
    //
    return null;
  }

  setContainerHandler(
    handler: MotionLayerContainerHandler,
    containerId: string = DEFAULT_RALAYER_CONTAINER_ID,
  ) {
    this.motionLayerContainerHandlers.set(containerId, handler);
  }

  present(
    comFunc: ComponentFunc,
    options: {containerId: string | undefined} = {
      containerId: DEFAULT_RALAYER_CONTAINER_ID,
    },
  ) {
    const childComponentFuncs = this.getChildComponentFuncs(
      options.containerId,
    );
    const containerHandler = this.getTopLayerHandler(options.containerId);
    //
    const componentId = utils.randomString({length: 8});
    //
    const componentFuncItem = {
      componentId: componentId,
      subLayerContainerHandler: Handler.createStaticHandler<RASubLayerLayerContainerHandler>(),
      containerId: options.containerId,
      ctx: {componentId, containerId: options.containerId!},
      func: comFunc,
    };
    //
    childComponentFuncs.push(componentFuncItem);
    MotionLayerComponentStorage.push(componentFuncItem);
    //
    if (containerHandler) {
      containerHandler.rerenderIfAny();
    } else {
      throw new Error(
        `MotionLayerContainer with containerId = ${options.containerId} could not be found.`,
      );
    }
    //
    return componentId;
  }

  removeChildComponentFuncById(containerId: string, componentId: string) {
    const childComponentFuncs = this.getChildComponentFuncs(containerId);
    const index = childComponentFuncs.findIndex((item) => {
      return item.componentId === componentId;
    });
    if (index !== -1) {
      childComponentFuncs.splice(index, 1);
      MotionLayerComponentStorage.remove(componentId);
    }
  }

  dismiss(
    ctx: ComponentContext = {
      containerId: DEFAULT_RALAYER_CONTAINER_ID,
      componentId: DEFAULT_COMPONENT_ID,
    },
  ) {
    this.removeChildComponentFuncById(ctx.containerId, ctx.componentId);
    //
    const containerHandler = this.getTopLayerHandler(ctx.containerId);
    if (containerHandler) {
      containerHandler.rerenderIfAny();
    }
  }

  cleanupContainer(containerId: string) {
    this.ChildComponentFuncs.set(containerId, []);
  }
}

const instance = new MotionLayerManager();

export {instance as MotionLayerManager};
