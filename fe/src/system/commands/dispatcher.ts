import { ChordMap, Match } from './chordMap.ts';
import { Chord, Chords } from '../kbe/chord.ts';
import { KeyEventTarget } from './events.ts';
import { DispatcherConfig } from './config.ts';
import { Handler } from './intent.ts';

export class Dispatcher {
  private rootTree = new ChordMap();

  // these variables are used for pending-mode, where a chord is a common prefix
  // between multiple commands.
  private pendingTimeoutId?: number;
  private pendingTree?: ChordMap;
  private pendingPrefix: Chords = [];

  constructor(
    private readonly element: KeyEventTarget,
    private readonly cfg: DispatcherConfig,
    private handlers: Map<string, Handler>,
    keymaps: Map<string, Chords[]>,
  ) {
    this.onKeyDown = this.onKeyDown.bind(this);

    this.element.addEventListener('keydown', this.onKeyDown);
    keymaps.forEach((km, id) => {
      this.rootTree.add(id, km);
    });
  }

  unbind() {
    this.element.removeEventListener('keydown', this.onKeyDown);
  }

  private onKeyDown(e: KeyboardEvent) {
    const chord = Chord.from(e);
    if (!chord || chord.isModifierOnly()) {
      return;
    }

    // if we're in chord-pending mode, use the pendingTree, otherwise, start
    // with the rootTree.
    const tree = this.pendingTree ?? this.rootTree;

    const match = tree.find(chord);
    if (!match || this.shouldRestart(match)) {
      // restart, but don't prevent let parent element handle the event
      return this.restart();
    }

    // now, we either found a single command to be executed, or a subtree to
    // continue listening, or got a conflicting set of commands. In any case,
    // we need to swallow the event, prevent it from causing further actions.
    this.swallow(e);

    this.pendingPrefix.push(chord);

    // ideal case, there's only one command ID to execute.
    if (match.ids.length === 1) {
      return this.exec(match.ids[0]);
    }

    // we got no matching command IDs, but still can continue searching.
    if (match.sub) {
      this.pendingTree = match.sub;
      this.cfg.hook?.onPrefixMatch(
        this.pendingPrefix,
        this.pendingTree.commandIds(),
      );

      return this.startPendingTimeout();
    }

    // we have a conflicting case.
    const allIds = [...match.ids, ...tree.commandIds()];
    this.cfg.hook?.onMultiMatches(this.pendingPrefix, allIds);
    this.clearPendingTimeout();
  }

  private exec = (id: string) => {
    const f = this.handlers.get(id);
    if (f) {
      f();
    }

    this.restart();
    this.clearPendingTimeout();
  };

  private shouldRestart = (match: Match) => {
    // if for some reason, the matched data doesn't have any command IDs
    // nor a subtree to continue listening.
    return match.ids.length === 0 && match.sub === undefined;
  };

  private restart = () => {
    // clear the pendingTree since the chord match nothing,
    // so that on next key press, we can start searching from root.
    this.pendingTree = undefined;
    this.pendingPrefix = [];
  };

  /** swallow the event to disallow it to propagate up or causing other actions */
  private swallow = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return undefined;
  };

  private clearPendingTimeout = () => {
    if (this.pendingTimeoutId !== undefined) {
      window.clearTimeout(this.pendingTimeoutId);
    }
  };

  private startPendingTimeout = () => {
    this.clearPendingTimeout();
    this.pendingTimeoutId = window.setTimeout(this.restart, this.cfg.timeoutMs);
  };
}
