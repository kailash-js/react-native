import React, {FC, useEffect} from 'react';
import {
  View,
  ViewStyle,
  ViewProps,
  StyleProp,
  LayoutChangeEvent,
  useWindowDimensions,
} from 'react-native';
import Animated from 'react-native-reanimated';

const {
  useSharedValue,
  useAnimatedStyle,
  Extrapolate,
  withSpring,
  interpolate,
} = Animated;

interface CollapsiblePanelViewProps extends ViewProps {
  style: StyleProp<ViewStyle>;
  children: React.ReactNode;
  header: () => React.ReactNode;
  headerHeight?: number;
  headerContainerStyle: ViewStyle;
  contentContainerStyle: ViewStyle;
  isCollapsed?: Boolean;
}

const CollapsiblePanelView: FC<CollapsiblePanelViewProps> = ({
  children,
  style,
  header,
  isCollapsed,
  headerHeight,
  headerContainerStyle,
  contentContainerStyle,
}) => {
  const animationProgress = useSharedValue(0);
  const panelHeight = useSharedValue(headerHeight || 0);
  const contentHeight = useSharedValue(0);
  const isLayoutReady = useSharedValue(false);
  const dimensions = useWindowDimensions();
  //
  const onContentLayout = (e: LayoutChangeEvent) => {
    const {layout} = e.nativeEvent;
    contentHeight.value = layout.height;
    isLayoutReady.value = true;
  };

  const contentAnimatedStyle = useAnimatedStyle(() => {
    if (isLayoutReady.value) {
      return {
        opacity: interpolate(animationProgress.value, [0, 1], [0, 1]),
        transform: [
          {
            translateY: interpolate(
              animationProgress.value,
              [0, 1],
              [-contentHeight.value, 0],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    } else {
      return {
        transform: [{translateY: -dimensions.height}],
      };
    }
  });

  const panelAnimatedStyle = useAnimatedStyle(() => {
    if (isLayoutReady.value) {
      return {
        height: interpolate(
          animationProgress.value,
          [0, 1],
          [panelHeight.value, panelHeight.value + contentHeight.value],
          Extrapolate.CLAMP,
        ),
      };
    }
    return {
      height: panelHeight.value,
    };
  });

  const performAnimation = () => {
    if (isCollapsed) {
      animationProgress.value = withSpring(0, {});
    } else {
      animationProgress.value = withSpring(1, {});
    }
  };

  useEffect(() => {
    performAnimation();
  }, [isCollapsed]);

  return (
    <Animated.View style={[{overflow: 'hidden'}, panelAnimatedStyle, style]}>
      <View style={[{zIndex: 1, height: headerHeight}, headerContainerStyle]}>
        {header()}
      </View>
      <Animated.View
        style={[contentContainerStyle, contentAnimatedStyle]}
        onLayout={onContentLayout}>
        {children}
      </Animated.View>
    </Animated.View>
  );
};

CollapsiblePanelView.defaultProps = {
  children: [],
  isCollapsed: true,
  headerHeight: 40,
  header: () => {
    return null;
  },
};

export {CollapsiblePanelView};
