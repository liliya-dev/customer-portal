export type UserType = {
  license: string;
  role: string;
  email: string;
  name: string;
  department: string;
};

export type UserFields = {
  id: string;
  lastActiveDate: string;
} & UserType;

export const COLORS = {
  blue: '#496fff',
  lightblue: '#f7fafc',
  white: '#ffffff',
  red: '#f4473f',
  green: '#99cf2d',
  yellow: '#ffc933',
  indigo: '#003e56',
  darkblue: '#334eb3',
  gray: '#e5e7eb',
  black: '#000',
  lightpurple: '#C8D4FF',
};

export const ALIGNMENTS = {
  left: 'Left',
  center: 'Center',
  right: 'Right',
  auto: 'Auto',
};

export const SIZES = {
  none: 'None',
  xs: 'Extra Extra Small',
  xxs: 'Extra Small',
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
  xl: 'Extra Large',
  xxl: 'Extra Extra Large',
};

export type TextElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'span'
  | 'div'
  | 'p'
  | 'figcaption'
  | 'strong';

export const FONT_WEIGHTS = {
  thin: 'Thin',
  extralight: 'Extralight',
  light: 'Light',
  normal: 'Normal',
  medium: 'Medium',
  semibold: 'Semibold',
  bold: 'Bold',
  extrabold: 'Extrabold',
  black: 'Black',
};

export const IMAGE_TYPE_OPTIONS = {
  screenshot: 'Screenshot',
  photo: 'Photo',
  logo: 'Logo',
};

export type ImageType = {
  src: string;
  width?: number;
  height?: number;
  type: keyof typeof IMAGE_TYPE_OPTIONS;
  alt: string;
  caption?: string;
  crop?: {
    _type: 'sanity.imageCrop';
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  hotspot?: {
    _type: 'sanity.imageHotspot';
    height: number;
    width: number;
    x: number;
    y: number;
  };
};

export const RATIOS = {
  '1:1': 'Square',
  '16:9': '16:9',
  '2:1': 'Flat',
  '13:8': '13:8',
};

export type RatioType = keyof typeof RATIOS;
export type RatiosType = { [key in keyof typeof RATIOS]: string };
