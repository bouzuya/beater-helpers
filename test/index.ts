import { tests as fixtureTests } from './fixture';
import { Test, run } from './helper';
import { tests as indexExportTests } from './index-export';

const tests: Test[] = [
  ...fixtureTests,
  ...indexExportTests
];

run(tests).catch(() => process.exit(1));
