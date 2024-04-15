import { assert, test } from 'vitest';
import { Key, namedKeys } from './keys.ts';

test('Key and namedKeys must have same length', () => {
  assert.equal(Key.MAX_VALUE, namedKeys.size);
});
