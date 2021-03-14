//@ts-ignore
import {
  MotionLayerComponentProps,
  MotionLayerAnimation,
  MotionLayerProps,
} from '@kailash-js/react-native-motion-layers';

export type PopoverDirection = 'above' | 'below';

export interface PopOverViewProps extends MotionLayerProps {
  yPosition?: number;
  arrowPosition?: number;
  direction?: PopoverDirection;
  animation?: MotionLayerAnimation<{
    arrowWidth: number;
    arrowHeight: number;
    arrowPosition: number;
  }>;
  backgroundColor?: string;
}

export interface MPopoverLayerConfig<T extends MotionLayerComponentProps> {
  MotionLayerComponent: React.FC<T>;
  props: T;
  motionLayerProps?: PopOverViewProps;
  yPosition?: number;
  arrowPosition?: number;
  direction?: PopoverDirection;
  backgroundColor?: string;
  targetContainerId?: string;
}
