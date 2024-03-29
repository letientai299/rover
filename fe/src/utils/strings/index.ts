export type cutResult = {
  first: string;
  second: string;
  found: boolean;
};

export function cut(s: string, sub: string): cutResult {
  const i = s.indexOf(sub);
  return i === -1
    ? {
        first: s,
        second: '',
        found: false,
      }
    : {
        first: s.slice(0, i),
        second: s.slice(i + sub.length),
        found: true,
      };
}
