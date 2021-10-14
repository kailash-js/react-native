export * from './Animations';
export * from './Layouts';
export * from './types';
export * from './SlideLayers';
//
import {SlideLayerConfig} from './types';
import {SlideLayerPresenter} from './SlideLayerPresenter';
//
export {SlideLayerPresenter};
//
export function present<T>(config: SlideLayerConfig<T>) {
  SlideLayerPresenter.present<T>(config);
}
