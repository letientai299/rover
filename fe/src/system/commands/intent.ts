import { Chords } from '../kbe/chord.ts';

export interface Intent {
  id: string;

  /**
   * A command could inherit some of its configuration from a parent command.
   * For example, if it doesn't have a customized {@link keymaps}, it
   * will make use of the parent chord sequences.
   */
  parentId?: string;

  /**
   * A command could be bound to multiple {@link Chords} base on user's
   * preferences.
   */
  keymaps?: Chords[];
}

export type Handler = () => void;

export type Actionable<T> = T & { handler: Handler };

export interface Action<T> extends Intent {
  configs: Actionable<T>[];
}

export class IntentError extends Error {
  constructor(kind: keyof Intent | string, msg: string) {
    super(msg);
    this.name = `IntentError : ${kind}`;
  }
}

export type FnUnbind = () => void;
