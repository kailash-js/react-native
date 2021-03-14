import {
  MotionLayerProps,
  MotionLayerComponentProps,
} from '@kailash-js/react-native-motion-layers';

export type SlideFromDirection = 'top' | 'bottom' | 'left' | 'right';

export interface SlideLayerProps extends MotionLayerProps {
  contentOffsetBackground?: string;
}

export interface SlideLayerConfig<T extends MotionLayerComponentProps> {
  MotionLayerComponent: React.FC<T>;
  props: T;
  motionLayerProps?: SlideLayerProps;
  slideFrom?: SlideFromDirection | undefined;
  targetContainerId?: string;
}
