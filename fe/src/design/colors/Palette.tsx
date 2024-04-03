import Color from 'colorjs.io';
import { Property } from 'csstype';
import { CSSProperties, ReactNode } from 'react';

type C = Color | Property.Color;

const flex: CSSProperties = {
  display: 'flex',
};

const flexCol: CSSProperties = {
  flexDirection: 'column',
};

const mergeStyle = (...ss: CSSProperties[]) => {
  const x: CSSProperties = {};
  ss.forEach((s) => Object.assign(x, s));
  return x;
};

function Box({ color }: { color: C }) {
  const hex = color.toString({ format: 'hex' });
  return (
    <div style={mergeStyle(flexCol, flex, { margin: 4, width: 50 })}>
      <div
        style={{
          width: '50px',
          borderRadius: 4,
          aspectRatio: '1/1',
          background: color.toString({ format: 'hex' }),
        }}
      ></div>
      <p style={{ fontSize: '0.6em' }}>{hex}</p>
    </div>
  );
}

const Wrap = ({ children }: { children: ReactNode }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
      {children}
    </div>
  );
};

interface ScaleProps {
  name: string;
  colors: Color[];
}

function Scale(props: ScaleProps) {
  const { colors, name } = props;
  const boxes = colors.map((c, i) => <Box color={c} key={i} />);

  return (
    <article>
      <header>
        <strong>{name}</strong>
      </header>
      <Wrap>{boxes}</Wrap>
    </article>
  );
}

interface PaletteProps {
  color: Color | Property.Color;
}

const Palette = ({ color }: PaletteProps) => {
  const levels = 12;
  const scales = new Array(levels + 1).fill(0).map((_, i) => i);

  const base = new Color(color);
  const black = new Color('black');
  const white = new Color('white');

  const shades = scales.map((lvl) => {
    const c = base.clone();
    const p = lvl / levels;
    c.oklch.l = base.oklch.l + p * (black.oklch.l - base.oklch.l);
    return c;
  });

  const tints = scales.map((lvl) => {
    const c = base.clone();
    const p = lvl / levels;
    c.oklch.l = p * (white.oklch.l - base.oklch.l) + base.oklch.l;
    return c;
  });

  const opacities = scales.map((lvl) => {
    const c = base.clone();
    c.alpha = 1 - lvl / levels;
    return c;
  });

  // mix with gray, i.e. adjust chroma
  const tones = scales.map((lvl) => {
    const c = base.clone();
    c.oklch.c *= 1 - lvl / levels;
    return c;
  });

  return (
    <section style={mergeStyle(flex, flexCol)}>
      <Scale colors={tints} name={'Tints'} />
      <Scale colors={tones} name={'Tones'} />
      <Scale colors={shades} name={'Shades'} />
      <Scale colors={opacities} name={'Opacities'} />
    </section>
  );
};

export default Palette;
