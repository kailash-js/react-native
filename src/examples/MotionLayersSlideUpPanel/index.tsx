import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  MotionLayerHandler,
  MotionLayerManager,
  ComponentContext,
  MotionLayerComponentProps,
} from '@kailash-js/motion-ui';

import {SlideLayers, KLButton} from '@kailash-js/motion-ui';

import {Menu, MenuProps} from './Menu';
import InputPanel from './InputPanel';
import {Handler} from '@kailash-js/foundation';
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  ViewWithKeyboardReaction,
  AutoDimissKeyboardView,
} from '@kailash-js/motion-ui';

export const MotionLayersSlideUpPanelScreen = () => {
  const slideUpHandler = Handler.useHandler<MotionLayerHandler>();
  const slideFromLeftHandler = Handler.useHandler<MotionLayerHandler>();
  const slideFromRightHandler = Handler.useHandler<MotionLayerHandler>();
  const slideUpKeyboardInputHandler = Handler.useHandler<MotionLayerHandler>();

  const showSlideUpPopupAction = () => {
    MotionLayerManager.present((ctx: ComponentContext) => {
      return (
        <SlideLayers.SlideUpLayer
          handler={slideUpHandler}
          contentOffsetY={100}
          contentOffsetBackground={'red'}
          onViewReady={() => {
            slideUpHandler.present();
          }}
          onDidDismiss={() => {
            MotionLayerManager.dismiss(ctx);
          }}>
          <View
            style={{
              height: 400,
              backgroundColor: 'red',
              alignSelf: 'stretch',
              justifyContent: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text>Love</Text>
              <Button
                title="Close"
                onPress={() => {
                  slideUpHandler.dismiss();
                }}
              />
            </View>
          </View>
        </SlideLayers.SlideUpLayer>
      );
    });
  };

  const showSlideUpNoSwipePopupAction = () => {
    MotionLayerManager.present((ctx: ComponentContext) => {
      return (
        <SlideLayers.SlideUpLayer
          handler={slideUpHandler}
          canSwipe={false}
          contentOffsetY={100}
          contentOffsetBackground={'red'}
          onViewReady={() => {
            slideUpHandler.present();
          }}
          onDidDismiss={() => {
            MotionLayerManager.dismiss(ctx);
          }}>
          <View
            style={{
              height: 400,
              backgroundColor: 'red',
              alignSelf: 'stretch',
              justifyContent: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text>Love</Text>
              <Button
                title="Close"
                onPress={() => {
                  slideUpHandler.dismiss();
                }}
              />
            </View>
          </View>
        </SlideLayers.SlideUpLayer>
      );
    });
  };

  const showSlideDownPopupAction = () => {
    MotionLayerManager.present((ctx: ComponentContext) => {
      return (
        <SlideLayers.SlideDownLayer
          // handler={slideDownHandler}
          contentOffsetY={100}
          contentOffsetBackground={'yellow'}
          onViewReady={(handler: MotionLayerHandler | undefined) => {
            ctx.motionLayerHandler = handler;
            handler?.present();
          }}
          onDidDismiss={() => {
            MotionLayerManager.dismiss(ctx);
          }}>
          <View
            style={{
              height: 400,
              backgroundColor: 'yellow',
              alignSelf: 'stretch',
              justifyContent: 'center',
            }}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Love</Text>
              <Button
                title="Close"
                onPress={() => {
                  ctx.motionLayerHandler?.dismiss();
                }}
              />
            </View>
          </View>
        </SlideLayers.SlideDownLayer>
      );
    });
  };

  const showSlideFromLeftPopupAction = () => {
    MotionLayerManager.present((ctx: ComponentContext) => {
      return (
        <SlideLayers.SlideFromLeftLayer
          handler={slideFromLeftHandler}
          contentOffsetX={60}
          contentOffsetBackground={'blue'}
          onViewReady={() => {
            slideFromLeftHandler.present();
          }}
          onDidDismiss={() => {
            MotionLayerManager.dismiss(ctx);
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'blue',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              title="Close"
              onPress={() => {
                slideFromLeftHandler.dismiss();
              }}
            />
          </View>
        </SlideLayers.SlideFromLeftLayer>
      );
    });
  };

  const showSlideFromRightPopupAction = () => {
    MotionLayerManager.present((ctx: ComponentContext) => {
      return (
        <SlideLayers.SlideFromRightLayer
          handler={slideFromRightHandler}
          contentOffsetX={60}
          contentOffsetBackground={'green'}
          onViewReady={() => {
            slideFromRightHandler.present();
          }}
          onDidDismiss={() => {
            MotionLayerManager.dismiss(ctx);
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              title="Close"
              onPress={() => {
                slideFromRightHandler.dismiss();
              }}
            />
          </View>
        </SlideLayers.SlideFromRightLayer>
      );
    });
  };

  const showSlideUpMenuAction = () => {
    MotionLayerManager.present((ctx: ComponentContext) => {
      return (
        <SlideLayers.SlideUpLayer
          //handler={slideUpMenuHandler}
          contentOffsetY={100}
          contentOffsetBackground={'white'}
          animationContainerStyle={{
            alignItems: 'stretch',
          }}
          onViewReady={(handler: MotionLayerHandler | undefined) => {
            ctx.motionLayerHandler = handler;
            handler?.present();
          }}
          onDidDismiss={() => {
            MotionLayerManager.dismiss(ctx);
          }}>
          <View style={{}}>
            <Menu
              onSelectMenuItem={menuItemId => {
                //ctx.motionLayerHandler?.dismiss();
                if (menuItemId === 'share') {
                  showSlideFromRightPopupAction();
                }
              }}
            />
          </View>
        </SlideLayers.SlideUpLayer>
      );
    });
  };

  const showSlideUpFullAction = () => {
    MotionLayerManager.present((ctx: ComponentContext) => {
      return (
        <SlideLayers.SlideUpLayer
          //handler={slideUpMenuHandler}
          contentOffsetY={100}
          overlayTouchDimiss={false}
          contentOffsetBackground={'white'}
          onViewReady={(handler: MotionLayerHandler | undefined) => {
            ctx.motionLayerHandler = handler;
            handler?.present();
          }}
          onDidDismiss={() => {
            MotionLayerManager.dismiss(ctx);
          }}>
          <View
            style={{
              height: 500,
              backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'stretch',
            }}>
            <View style={{height: 100, backgroundColor: 'red'}} />
            <ViewWithKeyboardReaction
              disableReactionOnAndroid={true}
              style={{
                flex: 1,
                alignItems: 'stretch',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
              <ScrollView automaticallyAdjustContentInsets={false}>
                <AutoDimissKeyboardView
                  style={{
                    flex: 1,
                    alignItems: 'stretch',
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    style={{
                      height: 40,
                      borderWidth: 1,
                      borderColor: 'gray',
                      marginHorizontal: 20,
                      marginBottom: 20,
                    }}
                  />
                  <TextInput
                    style={{
                      height: 40,
                      borderWidth: 1,
                      borderColor: 'gray',
                      marginHorizontal: 20,
                      marginBottom: 20,
                    }}
                  />
                  <TextInput
                    style={{
                      height: 40,
                      borderWidth: 1,
                      borderColor: 'gray',
                      marginHorizontal: 20,
                      marginBottom: 20,
                    }}
                  />
                  <TextInput
                    style={{
                      height: 40,
                      borderWidth: 1,
                      borderColor: 'gray',
                      marginHorizontal: 20,
                      marginBottom: 20,
                    }}
                  />
                  <TextInput
                    style={{
                      height: 40,
                      borderWidth: 1,
                      borderColor: 'gray',
                      marginHorizontal: 20,
                      marginBottom: 20,
                    }}
                  />
                  <TextInput
                    style={{
                      height: 40,
                      borderWidth: 1,
                      borderColor: 'gray',
                      marginHorizontal: 20,
                      marginBottom: 20,
                    }}
                  />
                  <TextInput
                    style={{
                      height: 40,
                      borderWidth: 1,
                      borderColor: 'gray',
                      marginHorizontal: 20,
                      marginBottom: 20,
                    }}
                  />
                  <TextInput
                    style={{
                      height: 40,
                      borderWidth: 1,
                      borderColor: 'gray',
                      marginHorizontal: 20,
                      marginBottom: 20,
                    }}
                  />
                  <TextInput
                    style={{
                      height: 40,
                      borderWidth: 1,
                      borderColor: 'gray',
                      marginHorizontal: 20,
                      marginBottom: 20,
                    }}
                  />
                  <TextInput
                    style={{
                      height: 40,
                      borderWidth: 1,
                      borderColor: 'red',
                      marginHorizontal: 20,
                      marginBottom: 20,
                    }}
                  />
                </AutoDimissKeyboardView>
              </ScrollView>
              <TextInput
                style={{
                  height: 40,
                  borderWidth: 1,
                  borderColor: 'green',
                  marginHorizontal: 20,
                  marginBottom: 20,
                }}
              />
            </ViewWithKeyboardReaction>
          </View>
        </SlideLayers.SlideUpLayer>
      );
    });
  };

  const showSlideUpWithKeyboardInputAction = () => {
    MotionLayerManager.present((ctx: ComponentContext) => {
      return (
        <SlideLayers.SlideUpInputLayer
          handler={slideUpKeyboardInputHandler}
          contentOffsetY={100}
          contentOffsetBackground={'white'}
          overlayTouchDimiss={false}
          animationContainerStyle={{
            alignItems: 'stretch',
          }}
          onViewReady={() => {
            slideUpKeyboardInputHandler.present();
          }}
          onDidDismiss={() => {
            MotionLayerManager.dismiss(ctx);
          }}>
          <View style={{}}>
            <InputPanel
              onCancel={() => {
                slideUpKeyboardInputHandler.dismiss();
              }}
            />
          </View>
        </SlideLayers.SlideUpInputLayer>
      );
    });
  };

  interface TheUpDownPanelProps extends MotionLayerComponentProps {}

  const TheUpDownPanel: React.FC<TheUpDownPanelProps> = ({
    componentContext,
  }) => {
    return (
      <View
        style={{
          height: 400,
          backgroundColor: 'yellow',
          alignSelf: 'stretch',
          justifyContent: 'center',
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Love</Text>
          <Button
            title="Close"
            onPress={() => {
              componentContext?.motionLayerHandler?.dismiss();
            }}
          />
        </View>
      </View>
    );
  };

  interface TheLeftRightPanelProps extends MotionLayerComponentProps {}

  const TheLeftRightDownPanel: React.FC<TheLeftRightPanelProps> = ({
    componentContext,
  }) => {
    const animatedProgress = componentContext?.animatedProgress!;
    const layoutIsUserInteracting = componentContext?.layoutIsUserInteracting!;
    const layoutAnimatedProgress = componentContext?.layoutAnimatedProgress!;
    //
    const animatedStyles = useAnimatedStyle(() => {
      if (layoutIsUserInteracting.value) {
        return {
          opacity: interpolate(layoutAnimatedProgress.value, [0, 100], [1, 0]),
          transform: [
            {
              translateX: interpolate(
                layoutAnimatedProgress.value,
                [0, 100],
                [0, 100],
                Extrapolate.CLAMP,
              ),
            },
          ],
        };
      } else {
        return {
          opacity: interpolate(animatedProgress.value, [0, 1], [0, 1]),
          transform: [
            {
              translateX: interpolate(animatedProgress.value, [0, 1], [100, 0]),
            },
          ],
        };
      }
    });

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Love</Text>
          <Button
            title="Close"
            onPress={() => {
              componentContext?.motionLayerHandler?.dismiss();
            }}
          />
          <Animated.View
            style={[
              {width: 100, height: 100, backgroundColor: 'red'},
              animatedStyles,
            ]}>
            <Text style={{color: 'white'}}>Animated with container</Text>
          </Animated.View>
        </View>
      </View>
    );
  };

  const showSlideUpPresenterAction = () => {
    SlideLayers.present<MenuProps>({
      MotionLayerComponent: Menu,
      props: {
        onSelectMenuItem: (menuItemId: string) => {
          if (menuItemId === 'share') {
            showSlideFromRightPopupAction();
          }
        },
      },
      motionLayerProps: {
        contentOffsetY: 100,
        contentOffsetBackground: 'white',
      },
      slideFrom: 'bottom',
    });
    // const comp = MotionLayerComponentStorage.get(componentId!);
    // setTimeout(() => {
    //   comp?.subLayerContainerHandler?.coverAnimate();
    // }, 2000);
  };

  const showSlideDownPresenterAction = () => {
    SlideLayers.present<{}>({
      MotionLayerComponent: TheUpDownPanel,
      props: {},
      motionLayerProps: {
        contentOffsetY: 100,
        contentOffsetBackground: 'yellow',
      },
      slideFrom: 'top',
    });
  };

  const showSlideLeftPresenterAction = () => {
    SlideLayers.present<{}>({
      MotionLayerComponent: TheLeftRightDownPanel,
      props: {},
      motionLayerProps: {
        contentOffsetX: 60,
        contentOffsetBackground: 'yellow',
      },
      slideFrom: 'left',
    });
  };

  const showSlideRightPresenterAction = () => {
    SlideLayers.present<{}>({
      MotionLayerComponent: TheLeftRightDownPanel,
      props: {},
      motionLayerProps: {
        contentOffsetX: 60,
        contentOffsetBackground: 'red',
      },
      slideFrom: 'right',
    });
  };

  return (
    <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <KLButton title="Slide up" onPress={showSlideUpPopupAction} />
        </View>
        <View style={styles.body}>
          <Button
            title="Slide up disable swipe"
            onPress={showSlideUpNoSwipePopupAction}
          />
        </View>

        <View style={styles.body}>
          <Button title="Slide down" onPress={showSlideDownPopupAction} />
        </View>
        <View style={styles.body}>
          <Button
            title="Slide from left"
            onPress={showSlideFromLeftPopupAction}
          />
        </View>
        <View style={styles.body}>
          <Button
            title="Slide from right"
            onPress={showSlideFromRightPopupAction}
          />
        </View>
        <View style={styles.body}>
          <Button title="Slide Up Menu" onPress={showSlideUpMenuAction} />
        </View>
        <View style={styles.body}>
          <Button title="Slide Up Full" onPress={showSlideUpFullAction} />
        </View>
        <View style={styles.body}>
          <Button
            title="Slide Up with Keyboard Input Aware"
            onPress={showSlideUpWithKeyboardInputAction}
          />
        </View>
        <View style={styles.body}>
          <Button
            title="Slide Up Presenter"
            onPress={showSlideUpPresenterAction}
          />
        </View>
        <View style={styles.body}>
          <Button
            title="Slide Down Presenter"
            onPress={showSlideDownPresenterAction}
          />
        </View>
        <View style={styles.body}>
          <Button
            title="Slide from left Presenter"
            onPress={showSlideLeftPresenterAction}
          />
        </View>
        <View style={styles.body}>
          <Button
            title="Slide from right"
            onPress={showSlideRightPresenterAction}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },

  body: {
    backgroundColor: 'white',
  },
});
