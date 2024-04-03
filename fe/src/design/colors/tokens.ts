type Color = {
  bg: {
    primary: string; // main content
    secondary: string; // sidebar
  };

  borders: {
    subtle: string; // separate content within flow
    clear: string; // separate between panes, or different flow
  };

  fg: {
    text: string;
  };
};

type State = {
  normal: string;
  hover: string;
  active: string;
  disabled: string;
  selected: string;
};

type Interactive = {
  fg: State;
  bg: State;
  bd: State;
  outline: string;
  shadow: string;
};

// outline: use accent
// outline-danger

// fg-normal
// fg-hover
// fg-active
// fg-disabled
// fg-selected

// focus should use outline

// bg-normal
// bg-hover
// bg-active
// bg-disabled
// bg-selected

// ----------
// accent-fg-normal
// accent-fg-hover
// accent-fg-active
// accent-fg-disabled
// accent-fg-selected

// accent-bg-normal
// accent-bg-hover
// accent-bg-active
// accent-bg-disabled
// accent-bg-selected
