import { useState } from 'react';

export default function useRotate<T>(init: T, all: T[]): [T, () => void] {
  const [value, setValue] = useState(init);
  return [
    value,
    () =>
      setValue((v) => {
        const i = all.indexOf(v);
        return all[(i + 1) % all.length];
      }),
  ];
}
