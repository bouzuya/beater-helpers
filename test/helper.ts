import { Test, run } from 'beater';
import { fixture } from '../src';

const named = (name: string, t: Test): Test => {
  Object.defineProperty(t, 'name', { value: name });
  return t;
};

const test = named;

export { Test, fixture, run, test };
