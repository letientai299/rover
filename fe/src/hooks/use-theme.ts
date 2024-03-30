import { rotate } from '@/utils';
import { getDefaultStore, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const themeModeKey = 'theme-mode';
const allThemes = ['dark', 'light'] as const;
type Theme = (typeof allThemes)[number];

function getRoot() {
  return document.getElementsByTagName('html')[0]!;
}

function initTheme() {
  const theme: Theme =
    localStorage.getItem(themeModeKey) ??
    matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  const root = getRoot();
  root.className = theme;
  return theme;
}

const darkAtom = atomWithStorage(themeModeKey, initTheme());
const store = getDefaultStore();

store.sub(darkAtom, () => {
  getRoot().className = store.get(darkAtom);
});

export default function useTheme(): [Theme, () => void] {
  const [dark, setDark] = useAtom(darkAtom);
  return [dark, () => setDark((v) => rotate(v, [...allThemes]))];
}
