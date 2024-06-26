/**
 * cx filter list of strings or undefined, keeps only non-empty strings and
 * merge them into a single space-separated string that is usable as class
 * name in JSX/TSX.
 *
 * @example
 *  const active = false
 *  const hover = false
 *  cx('button', active ? 'primary' : 'normal', hover ? 'hovered' : '')
 *  // -> 'button primary'
 *  // Empty string cause from `hover` checking is removed
 */
export function cx(...cls: (string | undefined | null)[]) {
  return cls.filter((c) => c && c !== '').join(' ');
}

export function randInt({ min, max }: { min?: number; max?: number }): number {
  let a = min ?? 0;
  let b = max ?? Number.MAX_SAFE_INTEGER;
  if (a > b) {
    [a, b] = [b, a];
  }
  return Math.floor(Math.random() * (b - a) + a);
}

export function formatBytes(bytes: number, decimals?: number): string {
  if (bytes == 0) return '0 Bytes';
  decimals = decimals ?? 3;
  const k = 1024,
    dm = decimals || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function rotate<T>(cur: T, all: T[]): T {
  const i = all.indexOf(cur);
  return i < 0 ? all[0] : all[(i + 1) % all.length];
}
