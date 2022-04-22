import { pick } from '../../helpers/utils/object';
import { COLORS } from '../../types';

export const COLOR_OPTIONS = pick(
  COLORS,
  'white',
  'indigo',
  'lightblue',
  'gray',
  'black',
  'lightpurple',
);
export type ColorType = keyof typeof COLOR_OPTIONS;
