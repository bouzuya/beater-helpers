import assert from "power-assert";
import { name, named } from "../src/name";
import { Test, test } from "./helper";

const category = "/name ";
const tests: Test[] = [
  test(category + "name & named", () => {
    assert.deepStrictEqual(
      name(function foo() {}),
      "foo"
    );
    assert.deepStrictEqual(name(named("bar", () => {})), "bar");
    assert.deepStrictEqual(
      name(named("space included", () => {})),
      "space included"
    );
  })
];

export { tests };
