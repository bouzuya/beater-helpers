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
  test(category + 'before (void) -> test (void)', () => {
    const beforeFn = sinon.stub();
    const testFn = sinon.stub();
    return fixture({
      before: beforeFn as (() => void)
    }, testFn as (() => void))().then(() => {
      assert(testFn.callCount === 1);
    });
  }),
  test(category + 'before (t) -> test (void)', () => {
    const context = true;
    const beforeFn = sinon.stub().returns(context);
    const testFn = sinon.stub();
    return fixture({
      before: beforeFn as (() => typeof context)
    }, testFn as (() => void))().then(() => {
      assert(beforeFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
    });
  }),
  test(category + 'before (promise<t>) -> test (void)', () => {
    const context = true;
    const beforeFn = sinon.stub().returns(Promise.resolve(context));
    const testFn = sinon.stub();
    return fixture({
      before: beforeFn as (() => Promise<typeof context>)
    }, testFn as (() => void))().then(() => {
      assert(beforeFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
    });
  }),
  test(category + 'before (promise<t>) -> test (void)', () => {
    const context = true;
    const beforeFn = sinon.stub().returns(Promise.resolve(context));
    const testFn = sinon.stub();
    return fixture({
      before: beforeFn as (() => Promise<typeof context>)
    }, testFn as (() => void))().then(() => {
      assert(beforeFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
    });
  }),
  test(category + 'before (promise<t>) -> test (t)', () => {
    const context = true;
    const beforeFn = sinon.stub().returns(Promise.resolve(context));
    const value = 123;
    const testFn = sinon.stub().returns(value);
    return fixture({
      before: beforeFn as (() => Promise<typeof context>)
    }, testFn as (() => typeof value))().then(() => {
      assert(beforeFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
    });
  }),
  test(category + 'before (promise<t>) -> test (promise<t>)', () => {
    const context = true;
    const beforeFn = sinon.stub().returns(Promise.resolve(context));
    const value = 123;
    const testFn = sinon.stub().returns(Promise.resolve(value));
    return fixture({
      before: beforeFn as (() => Promise<typeof context>)
    }, testFn as (() => Promise<typeof value>))().then(() => {
      assert(beforeFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
    });
  }),
  test(category + 'before (promise<t>) -> test (promise<t>) -> after (void)', () => {
    const context = true;
    const beforeFn = sinon.stub().returns(Promise.resolve(context));
    const value = 123;
    const testFn = sinon.stub().returns(Promise.resolve(value));
    const afterFn = sinon.stub();
    return fixture({
      after: afterFn as (() => void),
      before: beforeFn as (() => Promise<typeof context>)
    }, testFn as (() => Promise<typeof value>))().then(() => {
      assert(beforeFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
      assert(afterFn.callCount === 1);
      assert(afterFn.getCall(0).args.length === 1);
      assert(afterFn.getCall(0).args[0] === context);
    });
  }),
  test(category + 'before (promise<t>) -> test (promise<t>) -> after (promise<void>)', () => {
    const context = true;
    const beforeFn = sinon.stub().returns(Promise.resolve(context));
    const value = 123;
    const testFn = sinon.stub().returns(Promise.resolve(value));
    const afterFn = sinon.stub().returns(Promise.resolve());
    return fixture({
      after: afterFn as (() => Promise<void>),
      before: beforeFn as (() => Promise<typeof context>)
    }, testFn as (() => Promise<typeof value>))().then(() => {
      assert(beforeFn.callCount === 1);
      assert(testFn.callCount === 1);
      assert(testFn.getCall(0).args.length === 1);
      assert(testFn.getCall(0).args[0] === context);
      assert(afterFn.callCount === 1);
      assert(afterFn.getCall(0).args.length === 1);
      assert(afterFn.getCall(0).args[0] === context);
    });
  })
];

export { tests };
