import { tests as fixtureTests } from './fixture';
import { Test, group, run } from './helper';
import { tests as indexExportTests } from './index-export';
import { tests as nameTests } from './name';

const tests: Test[] = group('/', [
  ...fixtureTests,
  ...indexExportTests,
  ...nameTests
]);

run(tests).catch(() => process.exit(1));
