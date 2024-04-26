import { Actionable, Intent, Registry } from 'src/system/commands';
import { Chord, ModKey } from '../../../system/kbe/chord.ts';
import { Code } from '../../../system/kbe/codes.ts';
import { KeyEventTarget } from '../../../system/commands/events.ts';
import { RefObject, useEffect } from 'react';

export type CmdInfo = {
  title?: string;
};

const movement = {
  up: {
    id: 'core.movement.up',
    keymaps: [
      [Chord.new(Code.ArrowUp)],
      [Chord.new(Code.KeyK)],
      [Chord.new(Code.KeyP, [ModKey.Ctrl])],
      [Chord.new(Code.KeyB, [ModKey.Ctrl]), Chord.new(Code.KeyH)],
    ],
  },
  down: {
    id: 'core.movement.down',
    keymaps: [
      [Chord.new(Code.ArrowDown)],
      [Chord.new(Code.KeyJ)],
      [Chord.new(Code.KeyN, [ModKey.Ctrl])],
      [Chord.new(Code.KeyB, [ModKey.Ctrl]), Chord.new(Code.KeyL)],
    ],
  },
  left: {
    id: 'core.movement.left',
    keymaps: [[Chord.new(Code.ArrowLeft)], [Chord.new(Code.KeyH)]],
  },

  right: {
    id: 'core.movement.right',
    keymaps: [[Chord.new(Code.ArrowRight)], [Chord.new(Code.KeyL)]],
  },
};

export const Core = {
  movement: movement,
} as const;

export const CmdRegistry = new Registry<CmdInfo>();

Object.values(Core)
  .flatMap(Object.values)
  .forEach((it) => CmdRegistry.declare(it as Intent));

export type CmdHandler = [string, () => void];

export function useCommandHandlers<T extends KeyEventTarget>(
  ref: RefObject<T>,
  ...handlers: CmdHandler[]
) {
  const data: [string, Actionable<CmdInfo>][] = handlers.map(([id, f]) => [
    id,
    { handler: f },
  ]);

  useEffect(() => {
    if (ref.current) {
      return CmdRegistry.bind(ref.current, new Map(data));
    }
  }, [data, ref]);
}
