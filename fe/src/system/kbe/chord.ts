import { Code, codeIdMap, codeNameMap } from './codes.ts';

export type Chords = Chord[];

/**
 * A chord is a combination of a key press with an optional set of
 * {@link ModKeys modifier keys}
 */
export class Chord {
  constructor(
    readonly metaKey: boolean,
    readonly ctrlKey: boolean,
    readonly altKey: boolean,
    readonly shiftKey: boolean,
    readonly code: Code,
  ) {}

  static new(code: Code, mods?: ModKey[]): Chord {
    mods = mods ?? [];
    return new Chord(
      mods.includes(ModKey.Meta),
      mods.includes(ModKey.Ctrl),
      mods.includes(ModKey.AltOpt),
      mods.includes(ModKey.Shift),
      code,
    );
  }

  static from(e: KeyboardEvent): Chord | undefined {
    const code = codeNameMap.get(e.code);
    if (code === undefined) return undefined;
    return new Chord(e.metaKey, e.ctrlKey, e.altKey, e.shiftKey, code);
  }

  equals(other: Chord): boolean {
    return (
      this.metaKey === other.metaKey &&
      this.ctrlKey === other.ctrlKey &&
      this.altKey === other.altKey &&
      this.shiftKey === other.shiftKey &&
      this.code === other.code
    );
  }

  hashCode(): string {
    const meta = Chord.bit(this.metaKey);
    const ctrl = Chord.bit(this.ctrlKey);
    const alt = Chord.bit(this.altKey);
    const shift = Chord.bit(this.shiftKey);
    return `${meta}${ctrl}${alt}${shift}${this.code}`;
  }

  /**
   * For debugging only
   */
  toString() {
    let s = this.metaKey ? 'meta +' : '';
    s += this.ctrlKey ? 'ctrl +' : '';
    s += this.altKey ? 'alt/opt +' : '';
    s += this.shiftKey ? 'shift +' : '';
    if (this.isModifierOnly()) {
      return s.slice(s.length - 2);
    }
    return s + codeIdMap.get(this.code)!;
  }

  /**
   * Does this keybinding refer to the key code of a modifier and it also has the modifier flag?
   */
  isModifierOnly(): boolean {
    return (
      (this.metaKey &&
        (this.code === Code.MetaLeft || this.code === Code.MetaRight)) ||
      (this.ctrlKey &&
        (this.code === Code.ControlLeft || this.code === Code.ControlRight)) ||
      (this.altKey &&
        (this.code === Code.AltLeft || this.code === Code.AltRight)) ||
      (this.shiftKey &&
        (this.code === Code.ShiftLeft || this.code === Code.ShiftRight))
    );
  }

  static bit = (b: boolean) => (b ? 1 : 0);
}

export const enum ModKey {
  Shift,
  Ctrl,

  /** Alt key for win/linux, Option key for Mac */
  AltOpt,

  /** Cmd on Mac, Window key for Win, and Super key for linux */
  Meta,
}
