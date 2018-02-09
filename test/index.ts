import { Test, run } from 'beater';
import { tests as addTests } from './add';
import { tests as fixtureTests } from './fixture';

const tests = ([] as Test[])
  .concat(addTests)
  .concat(fixtureTests);

run(tests).catch(() => process.exit(1));
