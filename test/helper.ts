import { Test, run } from "beater";
import { fixture, name, named } from "../src";

const group = (groupName: string, tests: Test[]): Test[] =>
  tests.map((t) => named(groupName + name(t), t));

const test = named;

export { Test, fixture, group, run, test };
