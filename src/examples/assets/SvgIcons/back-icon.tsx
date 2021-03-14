import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

const BackIcon = (props: SvgProps) => {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" {...props}>
      <Path
        d="M6.414 2L5 .586.293 5.293a1 1 0 000 1.414L5 11.414 6.414 10l-3-3H12V5H3.414z"
        fill="#111"
      />
    </Svg>
  );
};

export {BackIcon};
