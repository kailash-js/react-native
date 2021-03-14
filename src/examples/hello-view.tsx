import React, {FC, useState} from 'react';
import {View, Text} from 'react-native';
import {Handler} from '@kailash-js/react-native-bases';

export interface HelloViewHandler {
  justDoIt: () => void;
  justDoItOneMore: (str: string) => void;
}

interface HelloViewProps {
  hander: HelloViewHandler;
}

export const HelloView: FC<HelloViewProps> = (props) => {
  const [helloText, setHelloText] = useState<string>('Default hello...');

  const justDoIt = () => {
    setHelloText('Hello this time.');
  };

  const justDoItOneMore = (str: string) => {
    setHelloText(`Hello ${str} one more time.`);
  };

  Handler.useExposeHandler<HelloViewHandler>(
    props.hander,
    {
      justDoIt,
      justDoItOneMore,
    },
    [props.hander],
  );

  return (
    <View>
      <Text>{helloText}</Text>
    </View>
  );
};
