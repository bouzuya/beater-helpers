import { Test } from 'beater-reporter';

const namedFn = (name: string, t: Test): Test => {
  Object.defineProperty(t, 'name', { value: name });
  return t;
};

const nameFn = (t: Test): string => t.name;

export { nameFn as name, namedFn as named };
