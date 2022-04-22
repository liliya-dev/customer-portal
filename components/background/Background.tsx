import cx from 'classnames';
import React from 'react';

import { ColorType } from './BackgroundOptions';

export type BackgroundProps = {
  children: React.ReactElement | React.ReactNode;
  background: ColorType;
  bottomColor?: ColorType;
  borderTopColor?: ColorType;
  borderBottomColor?: ColorType;
  hidden?: boolean;
};

export const backgroundClasses: Record<ColorType, string> = {
  white: 'bg-white text-indigo-500',
  gray: 'bg-gray-50 text-indigo-500',
  lightblue: 'bg-lightblue text-indigo-500',
  indigo: 'bg-indigo-500 text-white',
  black: 'bg-black text-white',
  lightpurple: 'bg-blue-100 text-indigo-500',
};

export const Background = ({
  children,
  background = 'white',
  bottomColor,
  borderTopColor,
  borderBottomColor,
  hidden = true,
}: BackgroundProps) => {
  return (
    <div
      className={cx(
        { ['relative overflow-y-hidden']: hidden },
        backgroundClasses[background || 'white'],
      )}
    >
      {borderTopColor && (
        <div className={backgroundClasses[borderTopColor]}>
          <div className="absolute z-0 left-0 right-0 top-0 w-full bg-inherit h-24 md:h-28" />
        </div>
      )}

      {borderBottomColor && (
        <div className={backgroundClasses[borderBottomColor]}>
          <div className="absolute z-0 left-0 right-0 bottom-0 w-full bg-inherit h-24 md:h-28" />
        </div>
      )}

      {bottomColor && (
        <div className={backgroundClasses[bottomColor]}>
          <div className="absolute z-0 left-0 right-0 bottom-0 w-full bg-inherit h-24 md:h-1/3 lg:h-1/3" />
        </div>
      )}

      <div className="relative z-1 overflow-x-hidden">{children}</div>
    </div>
  );
};

export const BackgroundMemo = React.memo(Background);
