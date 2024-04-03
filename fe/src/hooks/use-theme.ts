import { rotate } from '@/utils';
import { getDefaultStore, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const themeModeKey = 'theme-mode';
const allThemes = ['dark', 'light'] as const;
type Theme = (typeof allThemes)[number];

function getRoot() {
  return document.getElementsByTagName('html')[0]!;
}

function initTheme(): Theme {
  let theme = localStorage.getItem(themeModeKey);
  if (!theme) {
    theme = matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  } else {
    theme = theme.replaceAll('"', '');
  }

  const root = getRoot();
  root.className = theme;
  return theme as Theme;
}

const darkAtom = atomWithStorage<Theme>(themeModeKey, initTheme());
const store = getDefaultStore();

store.sub(darkAtom, () => {
  getRoot().className = store.get(darkAtom);
});

export default function useTheme(): [Theme, () => void] {
  const [dark, setDark] = useAtom(darkAtom);
  return [dark, () => setDark((v) => rotate(v, [...allThemes]))];
}
