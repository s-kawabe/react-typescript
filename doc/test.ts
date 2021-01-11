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

const rate: { [unit: string]: number } = {
  USD: 1,
  EUR: 0.9,
  JPY: 108,
  GBP: 0.8,
};

type hoge = typeof rate;
type Unit = keyof typeof rate;

// エラーにならない
// const rate: { [unit: string]: number } = {
//   1: 1,
//   2: 0.9,
//   3: 108,
//   4: 0.8,
// };

const permissions = {
  r: 0b100,
  w: 0b010,
  x: 0b001,
};

// permissionsからオブジェクト型を判定、そこからさらにkeyを抜き出してunion型にする
type PermsChar = keyof typeof permissions; // 'r' | 'w' | 'x'
