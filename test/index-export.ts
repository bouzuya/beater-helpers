import assert from 'power-assert';
import { fixture } from '../src';
import { Test, test } from './helper';

const category = '/ ';
const tests: Test[] = [
  test(category + 'fixture', () => {
    assert(fixture);
  })
];

export { tests };
