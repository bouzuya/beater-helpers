import assert from 'power-assert';
import { fixture, name, named } from '../src';
import { Test, test } from './helper';

const category = '/ ';
const tests: Test[] = [
  test(category + 'fixture', () => {
    assert(fixture);
  }),

  test(category + 'name', () => {
    assert(name);
  }),

  test(category + 'named', () => {
    assert(named);
  })
];

export { tests };
