export * from './Animations';
export * from './Layouts';
export * from './types';
export * from './SlideLayers';
import {MotionLayerComponentProps} from '@kailash-js/react-native-motion-layers';
//
import {SlideLayerConfig} from './types';
import {SlideLayerPresenter} from './SlideLayerPresenter';
//
export {SlideLayerPresenter};
//
export function present<T extends MotionLayerComponentProps>(
  config: SlideLayerConfig<T>,
) {
  SlideLayerPresenter.present<T>(config);
}
