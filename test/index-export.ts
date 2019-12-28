import assert from 'power-assert';
import { fixture, name, named } from '../src';
import { Test, group, test } from './helper';

const tests: Test[] = group('index-export/', [
  test('fixture', () => {
    assert(fixture);
  }),

  test('name', () => {
    assert(name);
  }),

  test('named', () => {
    assert(named);
  })
]);

export { tests };
