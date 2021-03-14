import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {MotionLayer, MotionLayerAnimation, Utils} from '@kailash-js/react-native-motion-layers';
import {
  runOnJS,
  Easing,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {PopOverViewProps} from './types';

const ARROW_HEIGHT = 10;
const ARROW_WIDTH = 20;

const defaultSpringConfig = {
  damping: 10,
  mass: 1,
  stiffness: 100,
  overshootClamping: false,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
};

const defaultPopoverViewAnimation: MotionLayerAnimation<{
  direction: string;
  arrowWidth: number;
  arrowHeight: number;
  arrowPosition: number;
}> = {
  animatedStyles: (animatedProgress, extraInfo) => {
    'worklet';
    const {height, width} = extraInfo.layout.value;
    const {direction, arrowPosition, arrowHeight} = extraInfo.metaData.value;
    //
    if (direction === 'above') {
      return {
        opacity: interpolate(animatedProgress.value, [0, 1], [0, 1]),
        transform: Utils.transformOrigin(
          {x: (width / 2 - arrowPosition) * -1, y: height / 2},
          {scale: animatedProgress.value},
        ),
      };
    } else {
      return {
        opacity: interpolate(animatedProgress.value, [0, 1], [0, 1]),
        transform: Utils.transformOrigin(
          {
            x: (width / 2 - arrowPosition) * -1,
            y: ((height + arrowHeight) / 2) * -1,
          },
          {scale: animatedProgress.value},
        ),
      };
    }
  },
  presentAnimation: (animatedProgress, animationFinished) => {
    animatedProgress.value = withSpring(1, defaultSpringConfig, () => {
      runOnJS(animationFinished)();
    });
  },
  dismissAnimation: (animatedProgress, animationFinished) => {
    animatedProgress.value = withTiming(
      0,
      {duration: 250, easing: Easing.ease},
      () => {
        runOnJS(animationFinished)();
      },
    );
  },
};

const PopOverView: FC<PopOverViewProps> = ({
  handler,
  children = [],
  style = {},
  backgroundColor = 'white',
  hasOverlay = true,
  overlayColor = 'transparent',
  overlayAlpha = 0.7,
  overlayTouchDimiss = true,
  arrowPosition = 0,
  allowTouchThroughOverlay = false,
  direction = 'below',
  yPosition = 0,
  onViewReady = () => {},
  onDidPresent = () => {},
  onWillPresent = () => {},
  onWillDismiss = () => {},
  onDidDismiss = () => {},
}) => {
  function popOverLayoutStyle(): ViewStyle {
    if (direction === 'below') {
      return {
        flexDirection: 'column-reverse',
      };
    }
    return {
      flexDirection: 'column',
    };
  }

  const arrowStyle = () => {
    if (direction === 'above') {
      return {
        left: arrowPosition - ARROW_WIDTH / 2,
        transform: [{rotate: '180deg'}],
      };
    }
    return {
      left: arrowPosition - ARROW_WIDTH / 2,
    };
  };

  return (
    <MotionLayer
      handler={handler}
      style={[style, {top: yPosition}]}
      layoutStyle={{justifyContent: 'flex-start'}}
      animationContainerStyle={popOverLayoutStyle()}
      hasOverlay={hasOverlay}
      overlayTouchDimiss={overlayTouchDimiss}
      overlayColor={overlayColor}
      overlayAlpha={overlayAlpha}
      allowTouchThroughOverlay={allowTouchThroughOverlay}
      onViewReady={onViewReady}
      onDidPresent={onDidPresent}
      onWillPresent={onWillPresent}
      onWillDismiss={onWillDismiss}
      onDidDismiss={onDidDismiss}
      animation={defaultPopoverViewAnimation}
      animationMetaData={{
        direction,
        arrowWidth: ARROW_WIDTH,
        arrowHeight: ARROW_HEIGHT,
        arrowPosition,
      }}>
      <View style={{backgroundColor, borderRadius: 8}}>{children}</View>
      <View style={{height: ARROW_HEIGHT}}>
        <Svg
          style={[arrowStyle()]}
          width={ARROW_WIDTH}
          height={ARROW_HEIGHT}
          viewBox="0 0 15 11">
          <Path d="M7.5 0L15 11H0z" fill={backgroundColor} fillRule="evenodd" />
        </Svg>
      </View>
    </MotionLayer>
  );
};

export {PopOverView};
