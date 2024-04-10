import { HTMLAttributes, ReactNode } from 'react';
import { cx } from 'src/utils';
import { binarySearch } from 'src/utils/algo';
import styles from './DecoratedText.module.scss';

export interface DecoratedTextProps {
  text: string;
  decorations?: Decor[] | Decor;
}

type Range = [start: number, end: number];

export type Decor = {
  /**
   * Range to apply decoration to the {@link DecoratedTextProps#text}.
   * Invalid part of the range will be ignored.
   */
  range: Range;
  kind: DecorKind;
};

export type DecorKind = BuiltinDecorKind | CustomDecorKind;

export type BuiltinDecorKind = 'match' | 'error' | 'warn' | 'mnemonic';
export type CustomDecorKind = {
  name: string;
} & HTMLAttributes<HTMLSpanElement>;

function isCustomDecorKind(kind: DecorKind): kind is CustomDecorKind {
  return (kind as CustomDecorKind).name !== undefined;
}

const DecoratedText = (props: DecoratedTextProps) => {
  const { text, decorations, ...rest } = props;
  const decors =
    decorations === undefined
      ? []
      : Array.isArray(decorations)
        ? decorations
        : [decorations];
  const segments = createSegments(text, decors);

  return (
    <div className={styles.decoratedText} {...rest}>
      {segments}
    </div>
  );
};

const decorMatch = (s: string, part: string): Decor => {
  const i = s.indexOf(part);
  return { kind: 'match', range: [i, i + part.length] };
};

export const Decorations: Record<string, (s: string, part: string) => Decor> = {
  match: decorMatch,
  error: (s, part): Decor => ({ ...decorMatch(s, part), kind: 'error' }),
  warn: (s, part): Decor => ({ ...decorMatch(s, part), kind: 'warn' }),
  mnemonic: (s, char): Decor => {
    if (char.length !== 1) {
      throw new Error("'mnemonic' must be exactly one character'");
    }
    return { ...decorMatch(s, char), kind: 'mnemonic' };
  },
};

export type Seg = {
  range: Range;
  kinds: DecorKind[];
};

export const _overlap = (p: Seg, decor: Decor): Seg[] => {
  const [a, b] = decor.range;
  const [x, y] = p.range;
  const newKinds = [...p.kinds, decor.kind];

  // ----a--------b------
  // ------x---y---------
  if (a <= x && y <= b) {
    return [{ range: p.range, kinds: newKinds }];
  }

  // ----a--------b------
  // --x--------------y--
  if (x < a && b < y) {
    return [
      { range: [x, a], kinds: p.kinds },
      { range: [a, b], kinds: newKinds },
      { range: [b, y], kinds: p.kinds },
    ];
  }

  // ----a--------b------
  // --x----y------------
  if (y <= b) {
    return [
      { range: [x, a], kinds: p.kinds },
      { range: [a, y], kinds: newKinds },
    ];
  }

  return [
    { range: [x, b], kinds: newKinds },
    { range: [b, y], kinds: p.kinds },
  ];
};

function createSegments(
  text: string,
  decors: Decor[] | undefined,
): ReactNode | ReactNode[] {
  if (decors === undefined || decors.length === 0) {
    return <Segment text={text} />;
  }

  let segments: Seg[] = [
    {
      range: [0, text.length],
      kinds: [],
    },
  ];

  for (let decor of decors) {
    const [a, b] = decor.range;
    // find index of the first pair that overlaps with decor range
    const first = binarySearch(segments, (p: Seg) => {
      const [_, y] = p.range;
      return a < y;
    });

    // find index of the last pair that overlaps with decor range
    const last =
      binarySearch(segments, (p: Seg) => {
        const [x, _] = p.range;
        return b < x;
      }) - 1;

    segments = [
      ...segments.slice(0, first),
      ..._overlap(segments[first], decor),
      ...segments.slice(first + 1, last).map((p) => ({
        range: p.range,
        kinds: [...p.kinds, decor.kind],
      })),
      ...(first !== last && last < segments.length
        ? _overlap(segments[last], decor)
        : []),
      ...segments.slice(last + 1, segments.length),
    ];
  }

  return segments.map((seg) => (
    <Segment
      text={text.slice(seg.range[0], seg.range[1])}
      kinds={seg.kinds}
      key={JSON.stringify(seg.range)}
    />
  ));
}

const Segment = (props: SegmentProps) => {
  const { text, kinds = [] } = props;
  // We're using wrapping spans to apply multiple decorations to a piece of
  // text, because we can't apply multiple text-decoration from different class
  // into one DOM element.
  //
  // We could work around that limitation by compute the final text-decoration
  // for our built-in DecorKind into one string and set it to the inline style.
  // However:
  //
  // - We can't merge built-in style with external/custom decorations.
  // - JS logic would be affected if we need to add more built-in kinds.
  //
  // Hence, we use spans wrapping method instead. JS will only need to create a
  // new span and set data-decoration-kind. CSS will handle the styling. More
  // built-in kind will require mostly CSS work.
  return kinds.reduce(
    (elem, kind) => {
      const {
        name,
        className = '',
        ...rest
      } = isCustomDecorKind(kind) ? kind : { name: kind };

      return (
        <span
          data-decoration-kind={name}
          className={cx(styles.segment, className)}
          {...rest}
        >
          {elem}
        </span>
      );
    },
    <>{text}</>,
  );
};

interface SegmentProps {
  text: string;
  kinds?: DecorKind[];
}

export default DecoratedText;
