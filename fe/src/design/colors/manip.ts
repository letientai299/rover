import Color from 'colorjs.io';

export function tone(c: Color, percent: number): Color {
  const r = c.clone();
  r.oklch.c *= 1 - percent / 100;
  return r;
}

export function shade(base: Color, percent: number): Color {
  const c = base.clone();
  const black = new Color('black');
  const p = percent / 100;
  c.oklch.l = base.oklch.l + p * (black.oklch.l - base.oklch.l);
  return c;
}

export function tint(base: Color, percent: number): Color {
  const white = new Color('white');
  const c = base.clone();
  const p = percent / 100;
  c.oklch.l = p * (white.oklch.l - base.oklch.l) + base.oklch.l;
  return c;
}
