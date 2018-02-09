export type BeforeFn<T> = (() => void) | (() => T | Promise<T>);
export type AfterFn<T> = ((context?: T) => void | Promise<void>);
export type TestFn<T, U> = ((context?: T) => void) | ((context?: T) => U | Promise<U>);
export type Fn<T, U> = (context?: T) => Promise<U | undefined>;

const promiseFinally = <T, U>(promise: Promise<T>, f: () => U): Promise<T> => {
  return promise.then(
    (v) => promiseTry(f).then((_) => Promise.resolve(v), (_) => Promise.resolve(v)),
    (e) => promiseTry(f).then((_) => Promise.reject(e), (_) => Promise.reject(e))
  );
};

const promiseTry = <T>(f: () => T | Promise<T>): Promise<T> => {
  return Promise.resolve().then(() => f());
};

const wrapFn = <T, U>(f: TestFn<T, U>): Fn<T, U> => {
  return (context: T | undefined): Promise<U | undefined> => {
    return promiseTry((): U | Promise<U | undefined> | undefined => {
      const r: void | U | Promise<U> = f(context);
      return typeof r === 'undefined' ? void 0 : r;
    });
  };
};

const fixture = <T, U>(
  options: {
    before?: BeforeFn<T>;
    after?: AfterFn<T>;
  },
  test: TestFn<T, U>
): () => Promise<void> => {
  const before: BeforeFn<T> = typeof options.before !== 'undefined'
    ? options.before : () => void 0;
  const after: AfterFn<T> = typeof options.after !== 'undefined'
    ? options.after : () => void 0;
  const b: Fn<undefined, T> = wrapFn<undefined, T>(before);
  const a: Fn<T, undefined> = wrapFn<T, undefined>(after);
  const t: Fn<T, U> = wrapFn<T, U>(test);
  return () => {
    return b()
      .then((c) => promiseFinally(t(c), () => a(c)))
      .then(() => Promise.resolve());
  };
};

export { fixture };
