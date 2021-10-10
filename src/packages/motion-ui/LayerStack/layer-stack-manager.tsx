import {
  LayerStackContainerHandler,
  ComponentFunc,
  ComponentFuncItem,
  ComponentContext,
  LayerStackHandler,
} from './types';
// @ts-ignore
import {utils, Handler} from '@kailash-js/foundation';

export const DEFAULT_LAYER_CONTAINER_ID = 'defaultStack';
export const DEFAULT_COMPONENT_ID = 'defaultCIDStack';

class LayerStackManager {
  stackLayerContainerHandlers: Map<
    string,
    LayerStackContainerHandler
  > = new Map<string, LayerStackContainerHandler>();

  ChildComponentFuncs: Map<string, ComponentFuncItem[]> = new Map<
    string,
    ComponentFuncItem[]
  >();

  getChildComponentFuncs(
    containerId: string = DEFAULT_LAYER_CONTAINER_ID,
  ): ComponentFuncItem[] {
    if (this.ChildComponentFuncs.has(containerId)) {
      return this.ChildComponentFuncs.get(containerId) || [];
    }
    this.ChildComponentFuncs.set(containerId, []);
    return [];
  }

  getTopLayerHandler(containerId: string = DEFAULT_LAYER_CONTAINER_ID) {
    if (this.stackLayerContainerHandlers.has(containerId)) {
      return this.stackLayerContainerHandlers.get(containerId);
    }
    //
    return null;
  }

  setContainerHandler(
    handler: LayerStackContainerHandler,
    containerId: string = DEFAULT_LAYER_CONTAINER_ID,
  ) {
    console.log('setContainerHandler');
    this.stackLayerContainerHandlers.set(containerId, handler);
  }

  push(
    comFunc: ComponentFunc,
    options: {containerId: string | undefined} = {
      containerId: DEFAULT_LAYER_CONTAINER_ID,
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
      containerId: options.containerId,
      ctx: {
        componentId,
        animation: true,
        containerId: options.containerId!,
        stackLayerHandler: Handler.createStaticHandler<LayerStackHandler>(),
      },
      func: comFunc,
    };
    //
    childComponentFuncs.push(componentFuncItem);
    //
    if (containerHandler) {
      containerHandler.rerenderIfAny();
    } else {
      throw new Error(
        `LayerStackContainer with containerId = ${options.containerId} could not be found.`,
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
    } else {
      childComponentFuncs.pop();
    }
  }

  dismiss(
    ctx: ComponentContext = {
      containerId: DEFAULT_LAYER_CONTAINER_ID,
      componentId: DEFAULT_COMPONENT_ID,
      animation: false,
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

  presentAnimation(containerId: string) {
    const childComponentFuncs = this.getChildComponentFuncs(containerId);
    const lastComponent = childComponentFuncs[childComponentFuncs.length - 1];
    if (childComponentFuncs.length > 1) {
      const backComponent = childComponentFuncs[childComponentFuncs.length - 2];
      lastComponent.ctx.stackLayerHandler?.present(lastComponent.ctx.animation);
      backComponent.ctx.stackLayerHandler?.parallaxCovered();
    } else {
      lastComponent.ctx.stackLayerHandler?.present(lastComponent.ctx.animation);
    }
  }

  pop(containerId: string = DEFAULT_LAYER_CONTAINER_ID) {
    const childComponentFuncs = this.getChildComponentFuncs(containerId);
    if (childComponentFuncs.length <= 0) {
      return;
    }
    //
    const lastComponent = childComponentFuncs[childComponentFuncs.length - 1];
    if (childComponentFuncs.length > 1) {
      const backComponent = childComponentFuncs[childComponentFuncs.length - 2];
      lastComponent.ctx.stackLayerHandler?.dismiss(() => {
        this.dismiss(lastComponent.ctx);
      });
      backComponent.ctx.stackLayerHandler?.unparallaxCovered();
    } else {
      lastComponent.ctx.stackLayerHandler?.dismiss(() => {
        this.dismiss(lastComponent.ctx);
      });
    }
  }
}

const instance = new LayerStackManager();

export {instance as LayerStackManager};
