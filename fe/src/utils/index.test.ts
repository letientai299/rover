import { cx } from 'src/utils/index.ts';
import { describe, expect, test } from 'vitest';

describe.each([
  {
    name: 'should filter out non empty strings',
    input: ['a', 'b', null, undefined, ''],
    want: 'a b',
  },

  {
    name: 'should merge prebuilt class lists as is',
    input: ['button filled', 'hovered'],
    want: 'button filled hovered',
  },
])('cx', function ({ name, want, input }) {
  test(name, () => {
    const actual = cx(...input);
    expect(actual).toEqual(want);
  });
});
