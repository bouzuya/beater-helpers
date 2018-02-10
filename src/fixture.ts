const promiseFinally = <T, U>(promise: Promise<T>, f: () => U): Promise<T> => {
  return promise.then(
    (v) => promiseTry(f).then((_) => Promise.resolve(v), (_) => Promise.resolve(v)),
    (e) => promiseTry(f).then((_) => Promise.reject(e), (_) => Promise.reject(e))
  );
};

const promiseTry = <T>(f: () => T | Promise<T>): Promise<T> => {
  return Promise.resolve().then(() => f());
};

const fixture = <T, U>(
  setUp: () => T | Promise<T>,
  tearDown: (context: T) => void | Promise<void>,
  test: (context: T) => U | Promise<U>
): () => Promise<void> => {
  return () => {
    return promiseTry(setUp)
      .then((c) =>
        promiseFinally(
          promiseTry(() => test(c)),
          () => promiseTry(() => tearDown(c))
        )
      )
      .then(() => Promise.resolve());
  };
};

export { fixture };
