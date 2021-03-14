import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useAnimatedRef,
  scrollTo,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {clamp} from 'react-native-redash';
const {interpolate, Extrapolate} = Animated;
import {MainStackParamList, MainStackScreens} from '../navigator-params';
import {StackNavigationProp} from '@react-navigation/stack';
import {SvgIcons} from '@assets';
import {Buttons} from '@components';

const HEADER_HEIGHT = 40;

type AutoHideHeaderScreenNavigationProps = StackNavigationProp<
  MainStackParamList,
  MainStackScreens.autoHideHeaderOnScroll
>;

interface AutoHideHeaderScreenProps {
  navigation: AutoHideHeaderScreenNavigationProps;
}

const AutoHideHeaderScreen: React.FC<AutoHideHeaderScreenProps> = ({
  navigation,
}) => {
  const aref = useAnimatedRef();
  const translationY = useSharedValue(0);
  const headerProgressY = useSharedValue(0);
  //
  const startHeaderProgressOffsetY = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const startScrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler<{}>({
    onScroll: (event) => {
      translationY.value = event.contentOffset.y;
      if (isScrolling.value) {
        const diff = startScrollY.value - translationY.value;
        if (diff < 0) {
          //scroll up
          const maxDiffValue = Math.max(diff, -HEADER_HEIGHT);
          headerProgressY.value = clamp(
            startHeaderProgressOffsetY.value + maxDiffValue,
            -HEADER_HEIGHT,
            0,
          );
        }
      }
    },
    onBeginDrag: (event) => {
      startScrollY.value = event.contentOffset.y;
      startHeaderProgressOffsetY.value = headerProgressY.value;
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
      //
      if (headerProgressY.value < 0) {
        headerProgressY.value = withTiming(-HEADER_HEIGHT, {
          duration: 250,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });
      }
      //Scroll to hide header bar if not scroll much
      if (translationY.value < HEADER_HEIGHT) {
        scrollTo(aref, 0, HEADER_HEIGHT, true);
      }
    },
    onMomentumBegin: () => {
      isScrolling.value = false;
      //
      if (startScrollY.value > translationY.value) {
        //scroll up
        headerProgressY.value = withTiming(0, {
          duration: 250,
          easing: Easing.linear,
        });
      } else {
        //scroll down
        headerProgressY.value = withTiming(-HEADER_HEIGHT, {
          duration: 250,
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });
      }
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            headerProgressY.value,
            [-HEADER_HEIGHT, 0],
            [-HEADER_HEIGHT, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const headerContentStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        headerProgressY.value,
        [-HEADER_HEIGHT, 0],
        [0, 1],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <View style={styles.container}>
      <SafeAreaView
        edges={['top']}
        mode="margin"
        style={{
          flex: 1,
          alignItems: 'stretch',
          backgroundColor: 'white',
        }}>
        <Animated.View
          style={[
            {
              backgroundColor: 'white',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: HEADER_HEIGHT,
              justifyContent: 'center',
              alignItems: 'stretch',
              zIndex: 1000,
            },
            headerStyle,
          ]}>
          <Animated.View
            style={[
              {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
              },
              headerContentStyle,
            ]}>
            <Buttons.MLIconButton
              style={{paddingLeft: 20}}
              onPress={() => {
                navigation.goBack();
              }}>
              <SvgIcons.BackIcon />
            </Buttons.MLIconButton>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Header</Text>
            </View>
          </Animated.View>
        </Animated.View>
        <Animated.ScrollView
          ref={aref}
          style={{backgroundColor: 'white', paddingTop: HEADER_HEIGHT}}
          onScroll={scrollHandler}
          scrollEventThrottle={16}>
          <View style={{height: 1500, backgroundColor: 'green'}} />
        </Animated.ScrollView>
      </SafeAreaView>
    </View>
  );
};

export {AutoHideHeaderScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
});
