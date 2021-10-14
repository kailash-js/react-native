import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {
  MotionLayer,
  MotionLayerHandler,
  MotionLayerContainer,
  MotionLayerManager,
  MotionLayerAnimation,
  ComponentContext,
  AutoDimissKeyboardView,
  RAContentLayoutComponent,
  MotionLayerInputContentLayout,
  MotionLayerComponentProps,
} from '@kailash-js/motion-uikit';
import {LoadingBlockerManager} from '@kailash-js/motion-uikit';
import {
  PopOverView,
  MPopoverLayerPresenter,
} from '@kailash-js/motion-uikit';

import {Handler} from '@kailash-js/foundation';
import {TestContentComponent} from './TestContentComponent';
import {
  runOnJS,
  Easing,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

const defaultSpringConfig = {
  damping: 10,
  mass: 1,
  stiffness: 100,
  overshootClamping: false,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
};

export const MotionLayersScreen = () => {
  const topPopupHandler = Handler.useHandler<MotionLayerHandler>();
  const localPopupHandler1 = Handler.useHandler<MotionLayerHandler>();
  const localPopupHandler2 = Handler.useHandler<MotionLayerHandler>();

  const showDefaultPopupAction = () => {
    MotionLayerManager.present((ctx: ComponentContext) => {
      return (
        <MotionLayer
          handler={topPopupHandler}
          onViewReady={() => {
            topPopupHandler.present();
          }}
          onDidDismiss={() => {
            MotionLayerManager.dismiss(ctx);
          }}>
          <View
            style={{
              width: 200,
              height: 200,
              backgroundColor: 'red',
              alignSelf: 'stretch',
            }}>
            <Text>Love</Text>
            <Button
              title="Close"
              onPress={() => {
                topPopupHandler.dismiss();
              }}
            />
          </View>
        </MotionLayer>
      );
    });
  };

  const showDefaultPopupWithDefaultHandlerAction = () => {
    MotionLayerManager.present((ctx: ComponentContext) => {
      return (
        <MotionLayer
          onViewReady={(handler: MotionLayerHandler | undefined) => {
            ctx.motionLayerHandler = handler;
            handler?.present();
          }}
          onDidDismiss={() => {
            MotionLayerManager.dismiss(ctx);
          }}>
          <View
            style={{
              width: 200,
              height: 200,
              backgroundColor: 'red',
              alignSelf: 'stretch',
            }}>
            <Text>Use interal handler, do not need to input from out side</Text>
            <Button
              title="Close"
              onPress={() => {
                ctx.motionLayerHandler?.dismiss();
              }}
            />
          </View>
        </MotionLayer>
      );
    });
  };

  const showDefaultPopupLocalLayerAction = () => {
    MotionLayerManager.present(
      (ctx: ComponentContext) => {
        return (
          <MotionLayer
            handler={localPopupHandler1}
            onViewReady={() => {
              localPopupHandler1.present();
            }}
            onDidDismiss={() => {
              MotionLayerManager.dismiss(ctx);
            }}>
            <View
              style={{
                width: 200,
                height: 200,
                backgroundColor: 'green',
                alignSelf: 'stretch',
              }}>
              <Text>Love</Text>
              <Button
                title="Close"
                onPress={() => {
                  localPopupHandler1.dismiss();
                }}
              />
              <Button
                title="Show Second Component"
                onPress={() => {
                  showDefaultPopupLocalLayerAction2NdLayer();
                }}
              />
            </View>
          </MotionLayer>
        );
      },
      {containerId: 'localTopLayer'},
    );
  };

  const showDefaultPopupLocalLayerAction2NdLayer = () => {
    MotionLayerManager.present(
      (ctx: ComponentContext) => {
        return (
          <MotionLayer
            handler={localPopupHandler2}
            onViewReady={() => {
              localPopupHandler2.present();
            }}
            onDidDismiss={() => {
              MotionLayerManager.dismiss(ctx);
            }}>
            <View
              style={{
                width: 200,
                height: 100,
                backgroundColor: 'blue',
                alignSelf: 'stretch',
              }}>
              <Text>This the 2nd component shown on the same top layer</Text>
              <Button
                title="Close"
                onPress={() => {
                  localPopupHandler2.dismiss();
                }}
              />
            </View>
          </MotionLayer>
        );
      },
      {containerId: 'localTopLayer'},
    );
  };

  const showDefaultPopupLocalLayerActionAutoClose = () => {
    showDefaultPopupLocalLayerAction();
    setTimeout(() => {
      showDefaultPopupLocalLayerAction2NdLayer();
    }, 1000);
    setTimeout(() => {
      localPopupHandler1.dismiss();
    }, 3000);
    setTimeout(() => {
      localPopupHandler2.dismiss();
    }, 4000);
  };
  const slideDownAnimation: MotionLayerAnimation = {
    animatedStyles: (animatedProgress, extraInfo) => {
      'worklet';
      const {height} = extraInfo.layout.value;
      return {
        opacity: interpolate(animatedProgress.value, [0, 1], [0, 1]),
        transform: [
          {
            translateY: interpolate(
              animatedProgress.value,
              [0, 1],
              [-height, 0],
            ),
          },
        ],
      };
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

  const slideUpAnimation: MotionLayerAnimation = {
    animatedStyles: (animatedProgress, extraInfo) => {
      'worklet';
      const {height} = extraInfo.layout.value;
      return {
        opacity: interpolate(animatedProgress.value, [0, 1], [0, 1]),
        transform: [
          {
            translateY: interpolate(
              animatedProgress.value,
              [0, 1],
              [height, 0],
            ),
          },
        ],
      };
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

  const showSlideDownPopupAction = () => {
    MotionLayerManager.present((ctx: ComponentContext) => {
      return (
        <MotionLayer
          handler={topPopupHandler}
          animation={slideDownAnimation}
          layoutStyle={{justifyContent: 'flex-start', alignItems: 'stretch'}}
          onViewReady={() => {
            topPopupHandler.present();
          }}
          onDidDismiss={() => {
            MotionLayerManager.dismiss(ctx);
          }}>
          <TestContentComponent
            onClose={() => {
              topPopupHandler.dismiss();
            }}
          />
        </MotionLayer>
      );
    });
  };

  const CustomLayout: RAContentLayoutComponent = props => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'stretch',
          transform: [{translateY: -90}],
        }}>
        {props.children}
      </View>
    );
  };

  const showSlideUpPopupAction = () => {
    //Use translateY to hide the over spring at the bottom
    const paddingBottom = 0;
    MotionLayerManager.present((ctx: ComponentContext) => {
      return (
        <MotionLayer
          style={{transform: [{translateY: paddingBottom}]}}
          handler={topPopupHandler}
          animation={slideUpAnimation}
          ContentLayoutComponent={CustomLayout}
          layoutStyle={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'stretch',
          }}
          onViewReady={() => {
            topPopupHandler.present();
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
                  topPopupHandler.dismiss();
                }}
              />
            </View>
            <View
              style={{
                height: paddingBottom,
                backgroundColor: 'red',
              }}
            />
          </View>
        </MotionLayer>
      );
    });
  };

  const showLoadingBlocker = () => {
    //Global level custom
    // LoadingBlockerManager.loadingBlockerView = () => {
    //   return (
    //     <View
    //       style={{
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         backgroundColor: 'red',
    //         width: 100,
    //         height: 100,
    //         borderRadius: 8,
    //       }}
    //     />
    //   );
    // };

    LoadingBlockerManager.showLoadingBlocker();
    LoadingBlockerManager.autoHideLoadingBlocker({duration: 2000});
  };

  const showLoadingBlockerQuick = () => {
    LoadingBlockerManager.showLoadingBlocker();
    LoadingBlockerManager.hideLoadingBlocker();
  };

  const showCustomLoadingBlocker = () => {
    //Per show customization
    LoadingBlockerManager.showLoadingBlocker(() => {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
            width: 100,
            height: 100,
            borderRadius: 8,
          }}
        />
      );
    });
    LoadingBlockerManager.autoHideLoadingBlocker({duration: 2000});
  };

  const showGlobalLoadingBlocker = () => {
    //global customization
    LoadingBlockerManager.loadingBlockerView = () => {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(227,95,43,0.7)',
            width: 100,
            height: 100,
            borderRadius: 8,
          }}>
          <ActivityIndicator animating={true} size="large" color="white" />
        </View>
      );
    };
    LoadingBlockerManager.showLoadingBlocker();
    setTimeout(() => {
      LoadingBlockerManager.hideLoadingBlocker();
    }, 2000);
    //LoadingBlockerManager.autoHideLoadingBlocker({duration: 2000});
  };

  const showTransparentLoadingBlocker = () => {
    LoadingBlockerManager.showTransparentLoadingBlocker();
    setTimeout(() => {
      LoadingBlockerManager.hideTransparentLoadingBlocker();
    }, 2000);
  };

  const showPopoverAction = () => {
    MotionLayerManager.present(() => {
      return (
        <PopOverView
          yPosition={140}
          arrowPosition={50}
          direction="above"
          backgroundColor={'green'}
          handler={topPopupHandler}
          onViewReady={() => {
            topPopupHandler.present();
          }}
          onDidDismiss={() => {
            MotionLayerManager.dismiss();
          }}>
          <View
            style={{
              height: 200,
              margin: 8,
              backgroundColor: 'red',
              alignSelf: 'stretch',
            }}>
            <Text>Love</Text>
            <Button
              title="Close"
              onPress={() => {
                topPopupHandler.dismiss();
              }}
            />
          </View>
        </PopOverView>
      );
    });
  };

  const showPopoverPresenterAction = () => {
    MPopoverLayerPresenter.present<MotionLayerComponentProps>({
      MotionLayerComponent: ({componentContext}) => {
        return (
          <View
            style={{
              height: 200,
              margin: 8,
              backgroundColor: 'red',
              alignSelf: 'stretch',
            }}>
            <Text>Love</Text>
            <Button
              title="Close"
              onPress={() => {
                componentContext?.motionLayerHandler?.dismiss();
              }}
            />
          </View>
        );
      },
      props: {},
      yPosition: 140,
      arrowPosition: 50,
      backgroundColor: 'blue',
      direction: 'above',
    });
  };

  const showDefaultPopupLocalLayerKeyboardAction = () => {
    MotionLayerManager.present(
      (ctx: ComponentContext) => {
        return (
          <MotionLayer
            handler={localPopupHandler1}
            animationContainerStyle={{flex: 1}}
            layoutStyle={{flex: 1, alignItems: 'stretch'}}
            ContentLayoutComponent={MotionLayerInputContentLayout}
            onViewReady={() => {
              localPopupHandler1.present();
            }}
            onDidDismiss={() => {
              MotionLayerManager.dismiss(ctx);
            }}>
            <AutoDimissKeyboardView
              autoDismissKeyboardWhenTapped="tapped-active"
              style={{
                flex: 1,
                backgroundColor: 'grey',
                justifyContent: 'center',
                alignSelf: 'stretch',
              }}>
              <Text>Love</Text>
              <TextInput
                style={{height: 60, borderColor: 'red', borderWidth: 1}}
                placeholder="This is a text"
              />
              <Button
                title="Close"
                onPress={() => {
                  localPopupHandler1.dismiss();
                }}
              />
              <Button
                title="Hide Key"
                onPress={() => {
                  Keyboard.dismiss();
                }}
              />
            </AutoDimissKeyboardView>
          </MotionLayer>
        );
      },
      {containerId: 'localTopLayerKeyboard'},
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          <Button title="Show popup" onPress={showDefaultPopupAction} />
          <Button
            title="Show popup using defaul handler"
            onPress={showDefaultPopupWithDefaultHandlerAction}
          />
          <Button
            title="Show popup local layer"
            onPress={showDefaultPopupLocalLayerAction}
          />
          <Button
            title="Show popup local layer 2nd"
            onPress={showDefaultPopupLocalLayerAction2NdLayer}
          />
          <Button
            title="Show popup local layer 2 layer and close 1st 1st"
            onPress={showDefaultPopupLocalLayerActionAutoClose}
          />
          <Button
            title="Show popup local layer with keyboard aware"
            onPress={showDefaultPopupLocalLayerKeyboardAction}
          />

          <Button title="Slide down" onPress={showSlideDownPopupAction} />
          <Button title="Slide up" onPress={showSlideUpPopupAction} />
          <Button title="Show Loading Blocker" onPress={showLoadingBlocker} />
          <Button
            title="Show Loading Blocker(auto close, quick)"
            onPress={showLoadingBlockerQuick}
          />
          <Button
            title="Show custom Loading Blocker"
            onPress={showCustomLoadingBlocker}
          />
          <Button
            title="Show global Loading Blocker"
            onPress={showGlobalLoadingBlocker}
          />
          <Button
            title="Show transparent Loading Blocker"
            onPress={showTransparentLoadingBlocker}
          />
          <Button title="Slide Popover" onPress={showPopoverAction} />
          <Button
            title="Slide Popover(using presenter)"
            onPress={showPopoverPresenterAction}
          />
        </View>
      </ScrollView>
      <MotionLayerContainer containerId="localTopLayer" />
      <MotionLayerContainer containerId="localTopLayerKeyboard" />
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
