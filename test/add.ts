import { Test, test } from 'beater';
import * as assert from 'power-assert';
import { add } from '../src/add';

const category = '/add ';
const tests: Test[] = [
  test(category, () => {
    assert(add(1, 2) === 3);
  })
];

export { tests };
