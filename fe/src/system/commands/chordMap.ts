import { Chord, Chords } from '../kbe/chord.ts';

export interface Match {
  ids: string[];
  sub?: ChordMap;
}

/**
 * ChordMap is a helper data structure that map a {@link Chord} to either an
 * intent ID or another map, in case that Chord is a common prefix of multiple
 * {@link Chords} belong to multiple {@link Intent}.
 */
export class ChordMap {
  // tree is the mapping of a chord with a list of matching command IDs and
  // possibly a subtree of more mapping, in case the chord is a common prefix of
  // many chord sequences.
  private tree = new Map<string, Match>();
  private ids = new Set<string>();

  update(id: string, newKeymaps: Chords[], oldKeymaps: Chords[]): void {
    this.remove(id, oldKeymaps);
    this.add(id, newKeymaps);
  }

  add(id: string, cur: Chords[]) {
    cur.forEach((seq) => this.addToTree(seq, id));
    this.ids.add(id);
  }

  remove(id: string, old: Chords[]) {
    old.forEach((seq) => this.removeFromTree(seq, id));
    this.ids.delete(id);
  }

  find(chord: Chord): Match | undefined {
    return this.tree.get(chord.hashCode());
  }

  commandIds(): string[] {
    return [...this.ids.values()];
  }

  private addToTree(seq: Chords, id: string): void {
    const [prefix, ...rest] = seq;
    const hash = prefix.hashCode();

    if (rest.length === 0) {
      // if it doesn't have the hash, we set the hash to the command ID.
      const v = this.tree.has(hash) ? this.tree.get(hash)! : { ids: [] };
      this.tree.set(hash, {
        sub: v.sub,
        ids: [...v.ids, id],
      });
      return;
    }

    const v: Match = this.tree.has(hash)
      ? this.tree.get(hash)!
      : { ids: [], sub: new ChordMap() };

    if (!v.sub) {
      v.sub = new ChordMap();
    }

    v.sub!.addToTree(rest, id);
    this.tree.set(hash, v);
  }

  private removeFromTree(seq: Chords, id: string) {
    const [prefix, ...rest] = seq;
    const hash = prefix.hashCode();
    if (!this.tree.has(hash)) {
      return;
    }

    const v = this.tree.get(hash)!;

    if (rest.length === 0) {
      this.tree.set(hash, {
        sub: v.sub,
        ids: v.ids.filter((cur) => cur !== id),
      });
      return;
    }

    if (!v.sub) {
      return;
    }

    v.sub!.removeFromTree(rest, id);
  }
}
