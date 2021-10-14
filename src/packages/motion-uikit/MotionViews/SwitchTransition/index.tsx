import React from 'react';
import {DisplayIf} from '../DisplayIf';
export interface TransitionComponent<T> {
  componentId: string;
  Component: React.FC<T>;
  props: T;
}
export interface TransitionViewConfig {
  components: TransitionComponent<any>[];
}

export interface SwitchTransitionProps {
  activeComponentId: string;
  config: TransitionViewConfig;
}

export const SwitchTransition: React.FC<SwitchTransitionProps> = ({
  activeComponentId,
  config,
}) => {
  return (
    <>
      {config.components.map((configItem) => {
        return (
          <DisplayIf
            key={configItem.componentId}
            isDisplaying={configItem.componentId === activeComponentId}>
            <configItem.Component {...configItem.props} />
          </DisplayIf>
        );
      })}
    </>
  );
};

export function createSwitchTransitionComponent<T>(
  component: TransitionComponent<T>,
): TransitionComponent<T> {
  return component;
}
