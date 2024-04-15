import { assert, test } from 'vitest';
import { Code, codeIdMap, codeNameMap } from './codes.ts';

test('Code and related map must have same length', () => {
  assert.equal(Code.MAX_VALUE, codeNameMap.size);
  assert.equal(Code.MAX_VALUE, codeIdMap.size);
});
