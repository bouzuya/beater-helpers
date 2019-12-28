import assert from "power-assert";
import { name, named } from "../src/name";
import { Test, group, test } from "./helper";

const tests: Test[] = group("/", [
  test("name & named", () => {
    assert.deepStrictEqual(
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      name(function foo() { return; }),
      "foo"
    );
    assert.deepStrictEqual(name(named("bar", () => void 0)), "bar");
    assert.deepStrictEqual(
      name(named("space included", () => void 0)),
      "space included"
    );
  })
]);

export { tests };
