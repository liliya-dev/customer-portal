import React from 'react';

import { slugify } from '../../helpers/utils/string';
import { Background, BackgroundProps } from '../background/Background';
import { Spacing, SpacingProps } from '../spacing/Spacing';
import { Width } from '../width/Width';

export type WrapperProps = {
  id?: string;
  children: React.ReactElement | React.ReactNode;
  hidden?: boolean;
} & Partial<BackgroundProps> &
  Partial<SpacingProps>;

export const Wrapper = ({
  children,
  background = 'white',
  bottomColor,
  borderTopColor,
  borderBottomColor,
  space = 'md',
  id,
  hidden = true,
}: WrapperProps) => {
  return (
    <div id={id ? slugify(id) : null}>
      <Background
        background={background}
        bottomColor={bottomColor}
        borderTopColor={borderTopColor}
        borderBottomColor={borderBottomColor}
        hidden={hidden}
      >
        <Width>
          <Spacing space={space}>{children}</Spacing>
        </Width>
      </Background>
    </div>
  );
};

export const WrapperMemo = React.memo(Wrapper);
