import assert from 'power-assert';
import sinon from 'sinon';
import { fixture } from '../src/fixture';
import { Test, group, test } from './helper';

const tests: Test[] = group('fixture/', [
  test('setUp (void) -> test (void) -> tearDown (void)', () => {
    const setUpFn = sinon.stub();
    const testFn = sinon.stub();
    const tearDownFn = sinon.stub();
    return fixture(
      setUpFn as (() => void),
      tearDownFn as (() => void),
      testFn as (() => void)
    )().then(() => {
      assert(setUpFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === void 0);
      assert(tearDownFn.callCount === 1);
      assert(tearDownFn.getCall(0).args.length === 1);
      assert(tearDownFn.getCall(0).args[0] === void 0);
    });
  }),

  test('setUp (t) -> test (void) -> tearDown (void)', () => {
    const context = true;
    const setUpFn = sinon.stub().returns(context);
    const testFn = sinon.stub();
    const tearDownFn = sinon.stub();
    return fixture(
      setUpFn as (() => typeof context),
      tearDownFn as (() => void),
      testFn as (() => void)
    )().then(() => {
      assert(setUpFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
      assert(tearDownFn.callCount === 1);
      assert(tearDownFn.getCall(0).args.length === 1);
      assert(tearDownFn.getCall(0).args[0] === context);
    });
  }),

  test('setUp (promise<t>) -> test (void) -> tearDown (void)', () => {
    const context = true;
    const setUpFn = sinon.stub().returns(Promise.resolve(context));
    const testFn = sinon.stub();
    const tearDownFn = sinon.stub();
    return fixture(
      setUpFn as (() => Promise<typeof context>),
      tearDownFn as (() => void),
      testFn as (() => void)
    )().then(() => {
      assert(setUpFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
      assert(tearDownFn.callCount === 1);
      assert(tearDownFn.getCall(0).args.length === 1);
      assert(tearDownFn.getCall(0).args[0] === context);
    });
  }),

  test('setUp (promise<t>) -> test (t) -> tearDown (void)', () => {
    const context = true;
    const setUpFn = sinon.stub().returns(Promise.resolve(context));
    const value = 123;
    const testFn = sinon.stub().returns(value);
    const tearDownFn = sinon.stub();
    return fixture(
      setUpFn as (() => Promise<typeof context>),
      tearDownFn as (() => void),
      testFn as (() => void)
    )().then(() => {
      assert(setUpFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
      assert(tearDownFn.callCount === 1);
      assert(tearDownFn.getCall(0).args.length === 1);
      assert(tearDownFn.getCall(0).args[0] === context);
    });
  }),

  test('setUp (promise<t>) -> test (promise<t>) -> tearDown (void)', () => {
    const context = true;
    const setUpFn = sinon.stub().returns(Promise.resolve(context));
    const value = 123;
    const testFn = sinon.stub().returns(Promise.resolve(value));
    const tearDownFn = sinon.stub();
    return fixture(
      setUpFn as (() => Promise<typeof context>),
      tearDownFn as (() => void),
      testFn as (() => void)
    )().then(() => {
      assert(setUpFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
      assert(tearDownFn.callCount === 1);
      assert(tearDownFn.getCall(0).args.length === 1);
      assert(tearDownFn.getCall(0).args[0] === context);
    });
  }),

  test('setUp (promise<t>) -> test (promise<t>) -> tearDown (promise<void>)', () => {
    const context = true;
    const setUpFn = sinon.stub().returns(Promise.resolve(context));
    const value = 123;
    const testFn = sinon.stub().returns(Promise.resolve(value));
    const tearDownFn = sinon.stub().returns(Promise.resolve());
    return fixture(
      setUpFn as (() => Promise<typeof context>),
      tearDownFn as (() => Promise<void>),
      testFn as (() => Promise<typeof value>)
    )().then(() => {
      assert(setUpFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
      assert(tearDownFn.callCount === 1);
      assert(tearDownFn.getCall(0).args.length === 1);
      assert(tearDownFn.getCall(0).args[0] === context);
    });
  })
]);

export { tests };
