import { useState } from 'react';

export default function useToggle(init: boolean): [boolean, () => void] {
  const [on, setOn] = useState(init);
  return [on, () => setOn((v) => !v)];
}
