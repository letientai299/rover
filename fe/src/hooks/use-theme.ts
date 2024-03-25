import { getDefaultStore, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const darkModeKey = 'dark-mode';

function initTheme() {
  const dark = localStorage.getItem(darkModeKey) === 'true' ??
    matchMedia('(prefers-color-scheme: dark)').matches;
  if (dark) {
    document.getElementById('root')!.className = 'dark';
  } else {
    document.getElementById('root')!.className = 'light';
  }
  return dark;
}

const darkAtom = atomWithStorage(darkModeKey, initTheme());
const store = getDefaultStore();

store.sub(darkAtom, () => {
  const root = document.getElementById('root')!;
  root.className = store.get(darkAtom) ? 'dark' : 'light';
});

export function useTheme(): [boolean, () => void] {
  const [dark, setDark] = useAtom(darkAtom);
  return [dark, () => setDark(v => !v)];
}
