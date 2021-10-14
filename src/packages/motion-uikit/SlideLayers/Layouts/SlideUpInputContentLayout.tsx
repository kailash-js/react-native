import React from 'react';
import {RAContentLayoutComponent} from '@kailash-js/motion-layers';
import Animated, {
  runOnJS,
  withSpring,
  interpolate,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  Extrapolate,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  TapGestureHandler,
  State,
  TapGestureHandlerStateChangeEvent,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

//@ts-ignore
import {
  useKeyboardEvents,
  KeyboardLayout,
} from '@kailash-js/keyboard';

const defaultSpringConfig = {
  damping: 40,
  mass: 1,
  stiffness: 200,
  overshootClamping: false,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
};

export const SlideUpInputContentLayout: RAContentLayoutComponent = props => {
  const y = props.layoutAnimatedProgress;
  const isDragging = props.layoutIsUserInteracting;
  const keyboardHeight = useSharedValue(0);
  //
  const dimiss = () => {
    props.onDismiss();
  };

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {startY: number}
  >({
    onStart: (_, ctx) => {
      ctx.startY = y.value;
      isDragging.value = true;
    },
    onActive: (event, ctx) => {
      y.value = Math.max(
        ctx.startY + event.translationY,
        props.contentOffsetY * -1,
      );
    },
    onEnd: _ => {
      if (y.value > props.contentOffsetY) {
        runOnJS(dimiss)();
      } else {
        y.value = withSpring(0, {}, isFinished => {
          if (isFinished) {
            isDragging.value = false;
          }
        });
      }
    },
  });

  const animatedLayoutStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: y.value,
        },
      ],
    };
  });

  const animatedLayoutWithKeyboardStyle = useAnimatedStyle(() => {
    return {
      marginBottom: keyboardHeight.value,
    };
  });

  const opacityOverlayStyle = useAnimatedStyle(() => {
    const animatedProgress = props.motionLayerAnimatedProgress;
    if (!isDragging.value) {
      return {
        opacity: interpolate(
          animatedProgress.value,
          [0, 1],
          [0, props.overlayAlpha],
          Extrapolate.CLAMP,
        ),
      };
    } else {
      return {
        opacity: interpolate(
          y.value,
          [0, props.contentOffsetY],
          [props.overlayAlpha, 0],
          Extrapolate.CLAMP,
        ),
      };
    }
  });

  const onOverlayTapped = (event: TapGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.END) {
      isDragging.value = false;
      if (props.overlayTouchDimiss) {
        dimiss();
      }
    }
  };

  useKeyboardEvents({
    onKeyboardHide: () => {
      keyboardHeight.value = withSpring(0, defaultSpringConfig);
    },
    onKeyboardShow: ({height}: KeyboardLayout) => {
      keyboardHeight.value = withSpring(height, defaultSpringConfig);
    },
  });

  return (
    <>
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: props.overlayColor,
          },
          opacityOverlayStyle,
        ]}
      />
      <PanGestureHandler
        enabled={props.canSwipe}
        onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'stretch',
            },
            animatedLayoutStyle,
            animatedLayoutWithKeyboardStyle,
          ]}>
          <TapGestureHandler onHandlerStateChange={onOverlayTapped}>
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'transpatent',
                },
              ]}
            />
          </TapGestureHandler>
          {props.children}
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};
