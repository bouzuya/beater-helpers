import { Test, test } from 'beater';
import * as assert from 'power-assert';
import * as sinon from 'sinon';
import { fixture } from '../src/fixture';

const category = '/fixture ';
const tests: Test[] = [
  test(category + 'test (void)', () => {
    const testFn = sinon.stub();
    return fixture({
      // no options
    }, testFn as (() => void))().then(() => {
      assert(testFn.callCount === 1);
    });
  }),
  test(category + 'setUp (void) -> test (void)', () => {
    const setUpFn = sinon.stub();
    const testFn = sinon.stub();
    return fixture({
      setUp: setUpFn as (() => void)
    }, testFn as (() => void))().then(() => {
      assert(testFn.callCount === 1);
    });
  }),
  test(category + 'setUp (t) -> test (void)', () => {
    const context = true;
    const setUpFn = sinon.stub().returns(context);
    const testFn = sinon.stub();
    return fixture({
      setUp: setUpFn as (() => typeof context)
    }, testFn as (() => void))().then(() => {
      assert(setUpFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
    });
  }),
  test(category + 'setUp (promise<t>) -> test (void)', () => {
    const context = true;
    const setUpFn = sinon.stub().returns(Promise.resolve(context));
    const testFn = sinon.stub();
    return fixture({
      setUp: setUpFn as (() => Promise<typeof context>)
    }, testFn as (() => void))().then(() => {
      assert(setUpFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
    });
  }),
  test(category + 'setUp (promise<t>) -> test (void)', () => {
    const context = true;
    const setUpFn = sinon.stub().returns(Promise.resolve(context));
    const testFn = sinon.stub();
    return fixture({
      setUp: setUpFn as (() => Promise<typeof context>)
    }, testFn as (() => void))().then(() => {
      assert(setUpFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
    });
  }),
  test(category + 'setUp (promise<t>) -> test (t)', () => {
    const context = true;
    const setUpFn = sinon.stub().returns(Promise.resolve(context));
    const value = 123;
    const testFn = sinon.stub().returns(value);
    return fixture({
      setUp: setUpFn as (() => Promise<typeof context>)
    }, testFn as (() => typeof value))().then(() => {
      assert(setUpFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
    });
  }),
  test(category + 'setUp (promise<t>) -> test (promise<t>)', () => {
    const context = true;
    const setUpFn = sinon.stub().returns(Promise.resolve(context));
    const value = 123;
    const testFn = sinon.stub().returns(Promise.resolve(value));
    return fixture({
      setUp: setUpFn as (() => Promise<typeof context>)
    }, testFn as (() => Promise<typeof value>))().then(() => {
      assert(setUpFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
    });
  }),
  test(category + 'setUp (promise<t>) -> test (promise<t>) -> tearDown (void)', () => {
    const context = true;
    const setUpFn = sinon.stub().returns(Promise.resolve(context));
    const value = 123;
    const testFn = sinon.stub().returns(Promise.resolve(value));
    const tearDownFn = sinon.stub();
    return fixture({
      setUp: setUpFn as (() => Promise<typeof context>),
      tearDown: tearDownFn as (() => void)
    }, testFn as (() => Promise<typeof value>))().then(() => {
      assert(setUpFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
      assert(tearDownFn.callCount === 1);
      assert(tearDownFn.getCall(0).args.length === 1);
      assert(tearDownFn.getCall(0).args[0] === context);
    });
  }),
  test(category + 'setUp (promise<t>) -> test (promise<t>) -> tearDown (promise<void>)', () => {
    const context = true;
    const setUpFn = sinon.stub().returns(Promise.resolve(context));
    const value = 123;
    const testFn = sinon.stub().returns(Promise.resolve(value));
    const tearDownFn = sinon.stub().returns(Promise.resolve());
    return fixture({
      setUp: setUpFn as (() => Promise<typeof context>),
      tearDown: tearDownFn as (() => Promise<void>)
    }, testFn as (() => Promise<typeof value>))().then(() => {
      assert(setUpFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
      assert(tearDownFn.callCount === 1);
      assert(tearDownFn.getCall(0).args.length === 1);
      assert(tearDownFn.getCall(0).args[0] === context);
    });
  })
];

export { tests };
