import {
  _overlap,
  Decor,
  Seg,
} from 'src/components/atoms/DecoratedText/DecoratedText.tsx';
import { describe, expect, test } from 'vitest';

describe.each([
  {
    seg: { range: [1, 3], kinds: [] } as Seg,
    decor: { range: [2, 6], kind: 'match' } as Decor,
    want: [
      { range: [1, 2], kinds: [] },
      { range: [2, 3], kinds: ['match'] },
    ] as Seg[],
  },

  {
    seg: { range: [1, 6], kinds: [] } as Seg,
    decor: { range: [2, 6], kind: 'match' } as Decor,
    want: [
      { range: [1, 2], kinds: [] },
      { range: [2, 6], kinds: ['match'] },
    ] as Seg[],
  },

  {
    seg: { range: [3, 6], kinds: [] } as Seg,
    decor: { range: [2, 4], kind: 'match' } as Decor,
    want: [
      { range: [3, 4], kinds: ['match'] },
      { range: [4, 6], kinds: [] },
    ] as Seg[],
  },

  {
    seg: { range: [2, 3], kinds: [] } as Seg,
    decor: { range: [1, 6], kind: 'match' } as Decor,
    want: [{ range: [2, 3], kinds: ['match'] }] as Seg[],
  },

  {
    seg: { range: [1, 6], kinds: [] } as Seg,
    decor: { range: [2, 3], kind: 'match' } as Decor,
    want: [
      { range: [1, 2], kinds: [] },
      { range: [2, 3], kinds: ['match'] },
      { range: [3, 6], kinds: [] },
    ] as Seg[],
  },
])('overlap', function ({ seg, decor, want }) {
  const name = `seg=[${seg.range}], decor=[${decor.range}]`;
  test(name, () => {
    const actual = _overlap(seg, decor);
    expect(actual).toEqual(want);
  });
});
