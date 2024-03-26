import { getDefaultStore, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const darkModeKey = 'dark-mode';

function getRoot() {
  return document.getElementsByTagName('html')[0]!;
}

function initTheme() {
  const dark =
    localStorage.getItem(darkModeKey) === 'true' ??
    matchMedia('(prefers-color-scheme: dark)').matches;
  const root = getRoot();
  if (dark) {
    root.className = 'dark';
  } else {
    root.className = 'light';
  }
  return dark;
}

const darkAtom = atomWithStorage(darkModeKey, initTheme());
const store = getDefaultStore();

store.sub(darkAtom, () => {
  getRoot().className = store.get(darkAtom) ? 'dark' : 'light';
});

export function useTheme(): [boolean, () => void] {
  const [dark, setDark] = useAtom(darkAtom);
  return [dark, () => setDark((v) => !v)];
}
