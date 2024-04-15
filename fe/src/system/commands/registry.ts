import { KeyEventTarget } from './events.ts';
import { Chords } from '../kbe/chord.ts';
import { DispatcherConfig } from './config.ts';
import { Dispatcher } from './dispatcher.ts';
import { Action, Actionable, FnUnbind, Intent, IntentError } from './intent.ts';

export const DEFAULT_PENDING_MODE_TIMEOUT_MS = 2000;

type BoundActionable<T> = Actionable<T> & { element: KeyEventTarget };

export type FnOnDeclare = (it: Intent) => void;

export interface IOnDeclare {
  onDeclare: FnOnDeclare;
}

export type OnDeclare = IOnDeclare | FnOnDeclare;

export interface IRegistry<T> {
  declare(it: Intent): Error | undefined;

  bind(
    el: KeyEventTarget,
    actions: ReadonlyMap<string, Actionable<T>>,
  ): FnUnbind;

  find(f?: (act: Action<T>) => boolean): Action<T>[];

  subscribe(listener: OnDeclare): () => void;
}

export class Registry<T> implements IRegistry<T> {
  private intents = new Map<string, Intent>();
  private actions = new Map<string, BoundActionable<T>[]>();

  private readonly cfg: DispatcherConfig;
  private listeners = new Set<OnDeclare>();

  constructor(cfg?: DispatcherConfig) {
    this.cfg = cfg ?? {
      timeoutMs: DEFAULT_PENDING_MODE_TIMEOUT_MS,
    };
  }

  subscribe(listener: OnDeclare): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  declare(it: Intent): Error | undefined {
    if (it.id.length === 0) {
      return new IntentError('id', `must not empty`);
    }

    if (it.parentId && !this.intents.has(it.parentId)) {
      return new IntentError('parentId', `intent '${it.parentId}' not found`);
    }

    this.intents.set(it.id, it);
    this.actions.set(it.id, []);

    this.listeners.forEach((lis) =>
      typeof lis === 'function' ? lis(it) : lis.onDeclare(it),
    );
  }

  find(take?: ((act: Action<T>) => boolean) | undefined): Action<T>[] {
    take = take ?? (() => true);
    const res = [];
    for (const [id, bounds] of this.actions.entries()) {
      const act = {
        ...this.intents.get(id)!,
        configs: bounds.map((b) => {
          return { ...b, element: undefined };
        }),
      };

      if (take(act)) {
        res.push(act);
      }
    }

    return res;
  }

  bind(el: KeyEventTarget, acts: ReadonlyMap<string, Actionable<T>>): FnUnbind {
    const handlers = new Map();
    const keymaps = new Map();
    for (const [id, act] of acts.entries()) {
      const intent = this.intents.get(id);
      if (!intent) {
        continue; // TODO (tai): is ignore the best way, or should we change bind .
      }

      handlers.set(id, act.handler);
      keymaps.set(id, this.resolveKeymaps(id));

      this.addAction(el, intent, act);
    }

    const dispatcher = new Dispatcher(el, this.cfg, handlers, keymaps);
    return () => {
      dispatcher.unbind();
      acts.forEach((_, id) => this.delActions(el, id));
    };
  }

  private resolveKeymaps(id: string): Chords[] {
    const it = this.intents.get(id);
    if (!it) {
      return [];
    }

    if (it.keymaps && it.keymaps.length !== 0) {
      return it.keymaps;
    }

    return it.parentId ? this.resolveKeymaps(it.parentId) : [];
  }

  private addAction(el: KeyEventTarget, intent: Intent, act: Actionable<T>) {
    let action = this.actions.get(intent.id);
    if (!action) {
      action = [];
    }

    action.push({ ...act, element: el });
    this.actions.set(intent.id, action);
  }

  private delActions(el: KeyEventTarget, id: string) {
    let acts = this.actions.get(id);
    if (!acts) {
      return;
    }

    acts = acts.filter((b) => b.element !== el);
    this.actions.set(id, acts);
  }
}
