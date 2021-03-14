import React from 'react';
import {RAContentLayoutComponent} from '@kailash-js/react-native-motion-layers';
import Animated, {
  runOnJS,
  withSpring,
  interpolate,
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

export const SlideFromLeftContentLayout: RAContentLayoutComponent = (props) => {
  const x = props.layoutAnimatedProgress;
  const isDragging = props.layoutIsUserInteracting;

  const dimiss = () => {
    props.onDismiss();
  };
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {startX: number}
  >({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      isDragging.value = true;
    },
    onActive: (event, ctx) => {
      x.value = Math.min(ctx.startX + event.translationX, props.contentOffsetX);
    },
    onEnd: (_) => {
      if (x.value < -props.contentOffsetX) {
        runOnJS(dimiss)();
      } else {
        x.value = withSpring(0, {}, (isFinished) => {
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
          translateX: x.value,
        },
      ],
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
          x.value,
          [0, -props.contentOffsetX],
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
              flexDirection: 'row',
              justifyContent: 'flex-start',
            },
            animatedLayoutStyle,
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
