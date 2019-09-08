import React from 'react';

export interface Props {
  size?: string;
  color?: string;
  topOffset?: string;
  leftOffset?: string;
  path: string;
}

export default ({
  size = '24px',
  color = 'black',
  topOffset = '0px',
  leftOffset = '0px',
  path,
}: Props) => {
  const style = {
    height: size,
    left: leftOffset,
    position: 'relative' as 'relative',
    top: topOffset,
    width: size,
  };
  return (
    <svg style={style} viewBox="0 0 24 24">
      <path fill={color} d={path} />
    </svg>
  );
};
