type KeyEventKind = 'keydown' | 'keyup';

export interface KeyEventTarget {
  addEventListener(
    kind: KeyEventKind,
    listener: (ev: KeyboardEvent) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;

  removeEventListener(
    kind: KeyEventKind,
    listener: (ev: KeyboardEvent) => void,
    options?: boolean | EventListenerOptions,
  ): void;
}
