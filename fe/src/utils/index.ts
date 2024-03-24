export function cx(...cls: (string | undefined)[]) {
  return cls.filter((c) => c !== undefined && c !== '').join(' ');
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
