// 関数の型
// const isPositive: IsPositiveFunc = num => num >= 0;

// // 使用例
// isPositive(5);

// // エラー例
// isPositive('foo');
// const res: number = isPositive(123);

type IsPositiveFunc = (num: number) => boolean;

// 別解
// interface IsPositiveFunc {
//   (arg: number): boolean;
// }

const isPositive: IsPositiveFunc = (num) => num >= 0;

// 使用例
isPositive(5);

// エラー例
isPositive('foo');
const res: number = isPositive(123);
