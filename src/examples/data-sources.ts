import {ListItemType} from '@types';
import {MainStackScreens} from './navigator-params';

export const ListItemDataSource: Array<ListItemType> = [
  {
    id: '1',
    name: 'handler',
    description: 'This is a good example of handler pattern',
    routeName: MainStackScreens.handler,
  },
  {
    id: '1.1',
    name: 'Miscellaneous',
    description: 'This is a Miscellaneous',
    routeName: MainStackScreens.miscellaneous,
  },
  {
    id: '2',
    name: 'event bus',
    description: 'This is a good example of event bus library',
    routeName: MainStackScreens.eventBus,
  },
  {
    id: '3',
    name: 'MotionLayers',
    description: 'This is a good example of MotionLayers',
    routeName: MainStackScreens.motionLayers,
  },
  {
    id: '4',
    name: 'RAlayers SlideUpPanel',
    description: 'MotionLayers slide up + swipe',
    routeName: MainStackScreens.motionLayersSlideUpPanel,
  },
  {
    id: '5',
    name: 'View With Keyboard Reaction',
    description: 'Test View With Keyboard Reacion',
    routeName: MainStackScreens.viewWithKeyboardReaction,
  },
  {
    id: '6',
    name: 'View With Keyboard Reaction - Scroll View',
    description: 'Test View With Keyboard Reacion in side a scroll view',
    routeName: MainStackScreens.viewWithKeyboardReactionScrollView,
  },
  {
    id: '7',
    name: 'Collapsible Panel',
    description: 'Test Collapsible Panel',
    routeName: MainStackScreens.collapsiblePanel,
  },
  {
    id: '8',
    name: 'Auto Hide Header on scroll',
    description: 'Auto Hide Header on scroll using reanimated 2',
    routeName: MainStackScreens.autoHideHeaderOnScroll,
  },
  {
    id: '9',
    name: 'RANavigationLayers',
    description: 'Test RANavigationLayers',
    routeName: MainStackScreens.ranavigationLayers,
  },
  {
    id: '10',
    name: 'MotionLayerPresenter',
    description: 'Test MotionLayerPresenter',
    routeName: MainStackScreens.motionLayerPresenter,
  },
  {
    id: '11',
    name: 'AnimationViewPresenter',
    description: 'Test AnimationViewPresenter',
    routeName: MainStackScreens.animationViewPresenter,
  },
  {
    id: '12',
    name: 'TransitionViewPresenter',
    description: 'Test TransitionViewPresenter',
    routeName: MainStackScreens.transitionViewPresenter,
  },
  {
    id: '13',
    name: 'StackLayers',
    description: 'Test StackLayers',
    routeName: MainStackScreens.stackLayers,
  },
];
