import {ComponentFuncItem} from '../types';

class MotionLayerComponentStorage {
  childComponentFuncs: Map<string, ComponentFuncItem> = new Map<
    string,
    ComponentFuncItem
  >();

  push(item: ComponentFuncItem) {
    this.childComponentFuncs.set(item.componentId, item);
  }

  remove(componentId: string) {
    this.childComponentFuncs.delete(componentId);
  }

  get(componentId: string) {
    return this.childComponentFuncs.get(componentId);
  }
}

const instance = new MotionLayerComponentStorage();

export {instance as MotionLayerComponentStorage};
