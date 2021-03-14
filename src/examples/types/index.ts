import {MainStackParamList} from '../navigator-params';

export type ListItemType = {
  id: string;
  name: string;
  description: string;
  routeName: keyof MainStackParamList;
};
