// undifinedな引数

// 🤔
// type Func<A, R> = (arg: undefined extends A ? void : A) => R;

// Aにundefinedを指定可能な場合は引数を省略可能にしたい
type Func<A, R> = undefined extends A ? (arg?: A) => R : (arg: A) => R;

// 使用例
const f1: Func<number, number> = (num) => num + 10;
const v1: number = f1(10);

const f2: Func<undefined, number> = () => 0;
const v2: number = f2();
const v3: number = f2(undefined);

const f3: Func<number | undefined, number> = (num) => (num || 0) + 10;
const v4: number = f3(123);
const v5: number = f3();

// エラー例
const v6: number = f1();
