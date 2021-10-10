import {
  MotionLayerProps,
  MotionLayerComponentProps,
} from '@kailash-js/motion-layers';

export type SlideFromDirection = 'top' | 'bottom' | 'left' | 'right';

export interface SlideLayerProps extends MotionLayerProps {
  contentOffsetBackground?: string;
}

export interface SlideLayerConfig<T extends MotionLayerComponentProps> {
  MotionLayerComponent: React.FC<T>;
  props: T;
  motionLayerProps?: SlideLayerProps;
  autoDismissKeyboard?: boolean;
  slideFrom?: SlideFromDirection | undefined;
  targetContainerId?: string;
}
