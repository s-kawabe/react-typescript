// 失敗する可能性のある処理の結果を表示する関数

type Result<T, E extends Error> = Ok<T, E> | Err<T, E>;

export class Ok<T, E extends Error> {
  constructor(readonly val: T) {}
  isOk = (): this is Ok<T, E> => true;
  isErr = (): this is Err<T, E> => false;
}

export class Err<T, E extends Error> {
  constructor(readonly err: E) {}
  isOk = (): this is Ok<T, E> => false;
  isErr = (): this is Err<T, E> => true;
}

export const withResult = <T, A extends any[], E extends Error>(
  fn: (...args: A) => Promise<T>
) => async (...args: A): Promise<Result<T, E>> => {
  try {
    return new Ok(await fn(...args));
  } catch (error) {
    if (error instanceof Error) {
      return new Err(error as E);
    }
  }
};

// getUser: (userId: string) => Promise<User>
const data = await withResult(getUser)("patty");

if (data.isErr()) {
  console.error(data.err);
} else {
  const user = data.val;
  console.log(`Hello, ${user.name}`);
}
