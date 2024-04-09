import { cut } from 'src/utils/strings/index.ts';
import { describe, expect, test } from 'vitest';

describe.each([
  {
    s: 'a/b/c.txt',
    sub: '/',
    want: { first: 'a', second: 'b/c.txt', found: true },
  },
  {
    s: 'button',
    sub: '-',
    want: { first: 'button', second: '', found: false },
  },
])('cx', function ({ want, s, sub }) {
  test(`${s} | ${sub}`, () => {
    const actual = cut(s, sub);
    expect(actual).toEqual(want);
  });
});
