import { Test, run, test } from 'beater';
import assert from 'power-assert';
import { fixture } from '../src';
import { tests as fixtureTests } from './fixture';

const category = '/ ';
const tests: Test[] = [
  test(category + 'fixture', () => {
    assert(fixture);
  })
]
  .concat(fixtureTests);

run(tests).catch(() => process.exit(1));
