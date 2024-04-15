import { Chords } from '../kbe/chord.ts';

export interface DispatcherConfig {
  timeoutMs?: number;
  hook?: DispatchHook;
}

export type DispatchHook = {
  // TODO (tai): multi match should provide the handlers together with command IDs,
  //  so that users can decide which one to be executed.
  onMultiMatches(seq: Chords, ids: string[]): void;
  onPrefixMatch(prefix: Chords, matches: string[]): void;
};
