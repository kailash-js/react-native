/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import 'react-native-reanimated';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MotionLayerContainer} from '@kailash-js/motion-uikit';
import {HomeScreen} from './home-screen';
import {HandlerScreen} from './Handler';
import {MiscellaneousScreen} from './Miscellaneous';
import {MotionLayersSlideUpPanelScreen} from './MotionLayersSlideUpPanel';
import {EventBusScreen} from './EventBus';
import {MotionLayersScreen} from './MotionLayers';
import {ViewWithKeyboardReactionScreen} from './ViewWithKeyboardReaction';
import {ViewWithKeyboardReactionScrollViewScreen} from './ViewWithKeyboardReactionScrollView';
import {CollapsibleScreen} from './CollapsiblePanel';
import {AutoHideHeaderScreen} from './AutoHideHeader';
import {RANavigationLayersScreen} from './RANavigationLayers';
import {MotionLayerPresenterScreen} from './MotionLayerPresenter';
import {AnimationViewPresenterScreen} from './AnimationViewPresenter';
import {TransitionViewPresenterScreen} from './TransitionViewPresenter';
import {StackLayersScreen} from './StackLayers';

import {MainStackParamList, MainStackScreens} from './navigator-params';

const MainStack = createStackNavigator<MainStackParamList>();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name={MainStackScreens.home}
          options={{title: 'Kailash Packages Examples'}}
          component={HomeScreen}
        />
        <MainStack.Screen
          name={MainStackScreens.handler}
          options={{title: 'Handler Examples'}}
          component={HandlerScreen}
        />
        <MainStack.Screen
          name={MainStackScreens.miscellaneous}
          options={{title: 'Miscellaneous Examples'}}
          component={MiscellaneousScreen}
        />

        <MainStack.Screen
          name={MainStackScreens.eventBus}
          options={{title: 'Event Bus Examples'}}
          component={EventBusScreen}
        />
        <MainStack.Screen
          name={MainStackScreens.motionLayers}
          options={{title: 'MotionLayers Examples'}}
          component={MotionLayersScreen}
        />
        <MainStack.Screen
          name={MainStackScreens.motionLayersSlideUpPanel}
          options={{title: 'MotionLayers Slide Up and Swipe Examples'}}
          component={MotionLayersSlideUpPanelScreen}
        />
        <MainStack.Screen
          name={MainStackScreens.viewWithKeyboardReaction}
          options={{title: 'View with Keyboard Reaction Examples'}}
          component={ViewWithKeyboardReactionScreen}
        />
        <MainStack.Screen
          name={MainStackScreens.viewWithKeyboardReactionScrollView}
          options={{
            title: 'View with Keyboard Reaction with ScrollView Examples',
          }}
          component={ViewWithKeyboardReactionScrollViewScreen}
        />
        <MainStack.Screen
          name={MainStackScreens.collapsiblePanel}
          options={{
            title: 'View with Keyboard Reaction with ScrollView Examples',
          }}
          component={CollapsibleScreen}
        />
        <MainStack.Screen
          name={MainStackScreens.autoHideHeaderOnScroll}
          options={{
            headerShown: false,
          }}
          component={AutoHideHeaderScreen}
        />
        <MainStack.Screen
          options={{
            title: 'RANavigationLayers',
          }}
          name={MainStackScreens.ranavigationLayers}
          component={RANavigationLayersScreen}
        />
        <MainStack.Screen
          options={{
            title: 'MotionLayerPresenter',
          }}
          name={MainStackScreens.motionLayerPresenter}
          component={MotionLayerPresenterScreen}
        />
        <MainStack.Screen
          options={{
            title: 'Animation View Presenter',
          }}
          name={MainStackScreens.animationViewPresenter}
          component={AnimationViewPresenterScreen}
        />
        <MainStack.Screen
          options={{
            title: 'Transition View Presenter',
          }}
          name={MainStackScreens.transitionViewPresenter}
          component={TransitionViewPresenterScreen}
        />
        <MainStack.Screen
          options={{
            title: 'Stack Layers',
          }}
          name={MainStackScreens.stackLayers}
          component={StackLayersScreen}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <AppContainer />
      <MotionLayerContainer />
    </SafeAreaProvider>
  );
};

export default App;
