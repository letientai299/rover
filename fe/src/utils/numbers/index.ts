export function clamp(
  num: number,
  { min, max }: { min: number; max: number },
): number {
  return num <= min ? min : num >= max ? max : num;
}

export function clampIn<T extends { readonly length: number }>(
  { length }: T,
  num: number,
): number {
  return clamp(num, { min: 0, max: length - 1 });
}
