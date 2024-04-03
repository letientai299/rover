import { shade } from '@/design/colors/manip.ts';
import Color from 'colorjs.io';
import { Property } from 'csstype';

type Level = {
  primary: Property.Color;
  secondary: Property.Color;
  tertiary: Property.Color;
};

export type Theme = {
  bg: Level;
  fg: Level;
  borders: Level;
};

function hex(c: Color): Property.Color {
  return c.toString({ format: 'hex' });
}

function genLevel(c: Color, v1: number, v2: number, v3: number): Level {
  return {
    primary: hex(shade(c, v1)),
    secondary: hex(shade(c, v2)),
    tertiary: hex(shade(c, v3)),
  };
}

type BaseTheme = {
  bg: Color;
  fg: Color;
};

export function newTheme({ bg, fg }: BaseTheme): Theme {
  return {
    bg: genLevel(bg, 0, 4, 2),
    fg: genLevel(fg, 0, 10, 20),
    borders: genLevel(fg, 60, 50, 40),
  };
}
