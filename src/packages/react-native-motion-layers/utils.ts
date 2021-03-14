export const transformOrigin = (
  {x, y}: {x: number; y: number},
  ...transforms: any[]
) => {
  'worklet';
  return [
    {translateX: x},
    {translateY: y},
    ...transforms,
    {translateX: x * -1},
    {translateY: y * -1},
  ];
};
